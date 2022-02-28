import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getLanguageGroups(): Observable<LanguageTemplateGroup> {
    let fakeData = {
      "Server & Capella": [
        { "key": "java", "value": "Java" },
      ],
      "Mobile": [
        { "key": "c", "value": "C" }
      ]
    };
    let jsonIn = JSON.parse(JSON.stringify(fakeData))

    let groups: LanguageTemplateGroup[] = [];
    for (let [groupName, langs] of Object.entries(jsonIn)) {
      let languages = [];
      for (var lang of langs as Array<any>) {
        languages.push(new LanguageTemplate(lang["key"], lang["value"]));
      }
      groups.push(new LanguageTemplateGroup(groupName, languages));
    }
    return from(groups);
  }

  getProjectGroups(value: any): Observable<ProjectTemplateGroup> {
    let fakeData = {
      "Getting Started": [
        { "key": "hello-world", "value": "Hello World" },
      ],
      "Spring": [
        { "key": "spring-boot", "value": "Spring Boot Sample" }
      ]
    };
    let jsonIn = JSON.parse(JSON.stringify(fakeData))

    let groups: ProjectTemplateGroup[] = [];
    for (let [groupName, projs] of Object.entries(jsonIn)) {
      let projects = [];
      for (var project of projs as Array<any>) {
        projects.push(new ProjectTemplate(project["key"], project["value"]));
      }
      groups.push(new ProjectTemplateGroup(groupName, projects));
    }
    return from(groups);
  }

  getMetadataGroups(value: any): Observable<MetadataTemplateGroup> {
    let fakeData = {
      "credentials": [
        { "name": "username", "type": "input" },
      ],
      "other": [
        { "name": "groupId", "type": "input", "defaultValue": "com.example" },
        { "name": "artifactId", "type": "input" },
      ]
    };
    let jsonIn = JSON.parse(JSON.stringify(fakeData))

    let groups: MetadataTemplateGroup[] = [];
    for (let [groupName, meta] of Object.entries(jsonIn)) {
      let metadata = [];
      for (var m of meta as Array<any>) {
        metadata.push(new MetadataTemplateField(m["name"], m["type"], m["defaultValue"]));
      }
      groups.push(new MetadataTemplateGroup(groupName, metadata));
    }
    return from(groups);
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
  defaultValue?: string;
  constructor(name: string, type: string, defaultValue?: string) {
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
  }
}