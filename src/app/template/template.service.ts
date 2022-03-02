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
      "sections": [
        {
          "key": "couchbase",
          "name": "Couchbase",
          "parameters": [
            {
              "key": "couchbase.connectionString",
              "name": "Connection String",
              "defaultValue": "127.0.0.1"
            },
            {
              "key": "couchbase.username",
              "name": "Username",
              "defaultValue": "Administrator"
            }
          ]
        },

        {
          "key": "project",
          "name": "Project",
          "parameters": [
            {
              "key": "project.group",
              "name": "Group",
              "defaultValue": "com.example"
            },
            {
              "key": "project.artifact",
              "name": "Artifact",
              "defaultValue": "hello-world"
            },
            {
              "key": "project.name",
              "name": "Name",
              "defaultValue": "${project.artifact}"
            },
            {
              "key": "project.package",
              "name": "Package",
              "defaultValue": "${project.group}.${project.artifact}"
            },
            {
              "key": "project.javaVersion",
              "name": "Java",
              "type": "select",
              "defaultValue": "1.8",
              "options": [
                {
                  "key": "1.8",
                  "name": "8"
                },
                {
                  "key": "11",
                  "name": "11"
                },
                {
                  "key": "17",
                  "name": "17"
                }
              ]
            }
          ]
        }
      ]
    };
    let jsonIn = JSON.parse(JSON.stringify(fakeData))

    let groups: MetadataTemplateGroup[] = [];
    for (let section of jsonIn["sections"]) {
      let groupKey = section["key"];
      let groupName = section["name"];
      let metadata: MetadataTemplateField[] = [];
      for (let p of section["parameters"]) {
        let options: MetadataTemplateOption[] = [];
        if (p["options"]) {
          for (let o of p["options"]) {
            options.push(new MetadataTemplateOption(o["key"], o["name"]));
          }
        }
        metadata.push(new MetadataTemplateField(p["key"], p["name"], options, p["type"], p["defaultValue"]));
      }
      groups.push(new MetadataTemplateGroup(groupKey, groupName, metadata));
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
  groupKey: string;
  groupName: string;
  fields: MetadataTemplateField[];

  constructor(groupKey: string, groupName: string, fields: MetadataTemplateField[]) {
    this.groupKey = groupKey;
    this.groupName = groupName;
    this.fields = fields;
  }
}

export class MetadataTemplateField {
  key: string;
  name: string;
  type?: string;
  defaultValue?: string;
  options: MetadataTemplateOption[];
  constructor(key: string, name: string, options: MetadataTemplateOption[], type?: string, defaultValue?: string) {
    this.key = key;
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    this.options = options;
  }
}

export class MetadataTemplateOption {
  key: string;
  name: string;

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }
}