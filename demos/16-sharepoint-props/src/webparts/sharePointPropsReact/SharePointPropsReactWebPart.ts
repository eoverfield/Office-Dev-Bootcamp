import * as React from 'react';
import * as ReactDom from 'react-dom';
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

import * as strings from 'SharePointPropsReactWebPartStrings';
import SharePointPropsReact from './components/SharePointPropsReact';
import { ISharePointPropsReactProps } from './components/ISharePointPropsReactProps';

/*
export interface ISharePointPropsReactWebPartProps {
  description: string;
}
*/

//add
export interface ISharePointPropsReactWebPartProps {
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

export default class SharePointPropsReactWebPart extends BaseClientSideWebPart<ISharePointPropsReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharePointPropsReactProps > = React.createElement(
      SharePointPropsReact,
      {
        description: this.properties.description,

        //add
        labelField: this.properties.labelField,
        textboxField: this.properties.textboxField,
        multilineTextboxField: this.properties.multilineTextboxField,
        checkboxField: this.properties.checkboxField,
        dropdownField: this.properties.dropdownField,
        linkField: this.properties.linkField,
        sliderField: this.properties.sliderField,
        toggleField: this.properties.toggleField
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
