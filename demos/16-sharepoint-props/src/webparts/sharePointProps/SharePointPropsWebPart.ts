import { Version } from '@microsoft/sp-core-library';
/*
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
*/
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SharePointPropsWebPart.module.scss';
import * as strings from 'SharePointPropsWebPartStrings';

/*
export interface ISharePointPropsWebPartProps {
  description: string;
}
*/

//add
export interface ISharePointPropsWebPartProps {
  description: string;
  labelField: string;
  textboxField: string;
  multilineTextboxField: string;
  checkboxField: boolean;
  dropdownField: string;
  linkField: string;
  sliderField: number;
  toggleField: boolean;
}


export default class SharePointPropsWebPartWebPart extends BaseClientSideWebPart<ISharePointPropsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.sharePointProps}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>

              <p class="ms-font-l ms-fontColor-white">Textbox value: ${this.properties.textboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Multi-line Textbox value: ${this.properties.multilineTextboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Checkbox checked: ${this.properties.checkboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Dropdown selected value: ${this.properties.dropdownField}</p>
              <p class="ms-font-l ms-fontColor-white">Slider value: ${this.properties.sliderField}</p>
              <p class="ms-font-l ms-fontColor-white">Toggle on: ${this.properties.toggleField}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //add
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),

                //add
                PropertyPaneLabel('labelField', {
                  text: 'Label text'
                }),
                PropertyPaneTextField('textboxField', {
                  label: 'Textbox label'
                }),
                PropertyPaneTextField('multilineTextboxField', {
                  label: 'Multi-line Textbox label',
                  multiline: true
                }),
                PropertyPaneCheckbox('checkboxField', {
                  text: 'Checkbox text'
                }),
                PropertyPaneDropdown('dropdownField', {
                  label: 'Dropdown label',
                  options: [
                    {key: '1', text: 'Option 1'},
                    {key: '2', text: 'Option 2'},
                    {key: '3', text: 'Option 3'}
                  ]
                }),
                PropertyPaneLink('linkField', {
                  text: 'Link text',
                  href: 'https://dev.office.com/sharepoint/docs/spfx',
                  target: '_blank'
                }),
                PropertyPaneSlider('sliderField', {
                  label: 'Slider label',
                  min: 0,
                  max: 100
                }),
                PropertyPaneToggle('toggleField', {
                  label: 'Toggle label',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
