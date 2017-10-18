import * as React from 'react';
import styles from './SharePointPropsReact.module.scss';
import { ISharePointPropsReactProps } from './ISharePointPropsReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SharePointPropsReact extends React.Component<ISharePointPropsReactProps, {}> {
  public render(): React.ReactElement<ISharePointPropsReactProps> {
    return (
      <div className={styles.sharePointPropsReact}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>


              <p className="ms-font-l ms-fontColor-white">Textbox value: {escape(this.props.textboxField)}</p>
              <p className="ms-font-l ms-fontColor-white">Multi-line Textbox value: {escape(this.props.multilineTextboxField)}</p>
              <p className="ms-font-l ms-fontColor-white">Checkbox checked: {this.props.checkboxField}</p>
              <p className="ms-font-l ms-fontColor-white">Dropdown selected value: {this.props.dropdownField}</p>
              <p className="ms-font-l ms-fontColor-white">Slider value: {this.props.sliderField}</p>
              <p className="ms-font-l ms-fontColor-white">Toggle on: {this.props.toggleField}</p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
