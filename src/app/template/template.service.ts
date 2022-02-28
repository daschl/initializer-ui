import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getLanguageGroups(): Observable<LanguageTemplateGroup> {
    return from([
      new LanguageTemplateGroup("Server & Capella", [new LanguageTemplate("java", "Java")]),
      new LanguageTemplateGroup("Mobile", [new LanguageTemplate("c", "C")])
    ]);
  }

  getProjectGroups(): Observable<ProjectTemplateGroup> {
    return from([
      new ProjectTemplateGroup("Getting Started", [new ProjectTemplate("hello-world", "Hello World")]),
      new ProjectTemplateGroup("Spring", [new ProjectTemplate("spring-boot", "Spring Boot Sample")])
    ]);
  }

  getMetadataGroups(): Observable<MetadataTemplateGroup> {
    return from([
      new MetadataTemplateGroup("credentials", [new MetadataTemplateField("username", "input")]),
      new MetadataTemplateGroup("other", [new MetadataTemplateField("groupId", "input"), new MetadataTemplateField("artifactId", "input")])
    ]);
  }
}


export class LanguageTemplateGroup {
  groupName: string;
  languages: LanguageTemplate[];

  constructor(groupName: string, languages: LanguageTemplate[]) {
    this.groupName = groupName;
    this.languages = languages;
  }
}

export class LanguageTemplate {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export class ProjectTemplateGroup {
  groupName: string;
  projects: ProjectTemplate[];

  constructor(groupName: string, projects: ProjectTemplate[]) {
    this.groupName = groupName;
    this.projects = projects;
  }
}

export class ProjectTemplate {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export class MetadataTemplateGroup {
  groupName: string;
  fields: MetadataTemplateField[];

  constructor(groupName: string, fields: MetadataTemplateField[]) {
    this.groupName = groupName;
    this.fields = fields;
  }
}

export class MetadataTemplateField {
  name: string;
  type: string;
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}