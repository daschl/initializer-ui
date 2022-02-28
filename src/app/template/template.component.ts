import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { LanguageTemplateGroup, MetadataTemplateGroup, ProjectTemplateGroup, TemplateService } from './template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  languages: LanguageTemplateGroup[] = [];
  projects: ProjectTemplateGroup[] = [];
  metadata: MetadataTemplateGroup[] = [];

  templateForm!: FormGroup;

  constructor(private fb: FormBuilder, private templateService: TemplateService) {

  }

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      languages: this.fb.array([]),
      projects: this.fb.array([]),
      metadata: this.fb.array([]),
    });

    this.languageForms.valueChanges.subscribe(v => {
      for (let entry of v) {
        if (entry.entry) {
          this.projects = [];
          this.templateService.getProjectGroups().subscribe({
            next: v => this.projects.push(v),
            complete: () => this.updateProjectForms(),
          });
        }
      }
    });

    this.projectForms.valueChanges.subscribe(v => {
      for (let entry of v) {
        if (entry.entry) {
          this.metadata = [];
          this.templateService.getMetadataGroups().subscribe({
            next: v => this.metadata.push(v),
            complete: () => this.updateMetadataForms(),
          });
        }
      }
    });

    this.languages = [];
    this.templateService.getLanguageGroups().subscribe({
      next: v => this.languages.push(v),
      complete: () => this.updateLanguageForms(),
    });
  }

  get languageForms() {
    return this.templateForm.get('languages') as FormArray
  }

  get projectForms() {
    return this.templateForm.get('projects') as FormArray
  }

  get metadataForms() {
    return this.templateForm.get('metadata') as FormArray
  }

  updateLanguageForms() {
    this.languageForms.clear();
    this.languages.forEach(_ => {
      this.languageForms.push(this.fb.group({
        entry: [],
      }))
    });
  }

  updateProjectForms() {
    this.projectForms.clear();
    this.projects.forEach(_ => {
      this.projectForms.push(this.fb.group({
        entry: [],
      }))
    });
  }

  updateMetadataForms() {
    this.metadataForms.clear();
    this.metadata.forEach(group => {
      let g: { [key: string]: any } = {};
      group.fields.forEach(field => {
        g[field.name] = field.defaultValue;
      })
      this.metadataForms.push(this.fb.group(g));
    });
  }

}

