import * as React from 'react';
import styles from './SharePointUiFabric2.module.scss';
import { ISharePointUiFabric2Props } from './ISharePointUiFabric2Props';
import { escape } from '@microsoft/sp-lodash-subset';

//add
import { Button, ButtonType, Nav, Panel, PanelType } from 'office-ui-fabric-react';


//export default class SharePointUiFabric2 extends React.Component<ISharePointUiFabric2Props, {}> {
export default class SharePointUiFabric2 extends React.Component<ISharePointUiFabric2Props, any> {
  //add
  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  /*
  public render(): React.ReactElement<ISharePointUiFabric2Props> {
    return (
      <div className={styles.sharePointUiFabric2}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  */

  //replace / add
  public render(): JSX.Element {
    return (
      <div>
        <div className='ms-BasicButtonsExample'>
          <Button
            data-automation-id='test'>Normal button</Button>
          <Button
            data-automation-id='test'
            buttonType={ButtonType.primary} onClick={this._buttonOnClickHandler.bind(this)}>Primary button</Button>
        </div>

        <div className='ms-NavExample-LeftPane'>
          <Nav
            groups={
              [
                {
                  links:
                  [
                    {
                      name: 'Home',
                      url: 'http://example.com',
                      links: [{
                        name: 'Activity',
                        url: 'http://msn.com'
                      },
                      {
                        name: 'News',
                        url: 'http://msn.com'
                      }],
                      isExpanded: true
                    },
                    { name: 'Documents', url: 'http://example.com', isExpanded: true },
                    { name: 'Pages', url: 'http://msn.com' },
                    { name: 'Notebook', url: 'http://msn.com' },
                    { name: 'Long Name Test for elipse', url: 'http://msn.com' },
                    { name: 'Edit Link', url: 'http://example.com', iconClassName: 'ms-Icon--Edit' },
                    {
                      name: 'Edit',
                      url: '#',
                      onClick: this._navOnClickHandler,
                      icon: 'Edit'
                    }
                  ]
                }
              ]
            }
          />
        </div>

        <div className='ms-PanelExample'>
          <Button description='Opens the Sample Panel' onClick={this._showPanel.bind(this)}>Open Panel</Button>
          <Panel
            isOpen={this.state.showPanel}
            type={PanelType.smallFixedFar}
            onDismiss={this._closePanel.bind(this)}
            headerText='Panel - Small, right-aligned, fixed'>
            <span className='ms-font-m'>Content goes here.</span>
          </Panel>
        </div>
      </div>
    );
  }

  private _buttonOnClickHandler() {
    alert('You clicked the primary button');
    return false;
  }

  private _navOnClickHandler() {
    alert('You clicked the edit button in navigation');
    return false;
  }

  private _showPanel() {
    this.setState({ showPanel: true });
  }

  private _closePanel() {
    this.setState({ showPanel: false });
  }
}
