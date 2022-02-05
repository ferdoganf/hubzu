import React, { Component } from 'react';
import { Form, Header, Grid } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

class RealestateDetailsCheckboxPanel extends Component {
    render() {
        return (
            <div>
                <Header as='h5' dividing>{this.props.panelTitle}
                    {this.props.required ?
                        <span style={{ color: '#DB2828' }}>*</span>
                        : null
                    }
                </Header>
                <Form.Group inline className='bordered'>
                    <Grid>
                        {
                            (this.props.panelItems) ?
                                this.props.panelItems.map(
                                    panelItem => {
                                        return (<Grid.Column className='minPadded' key={panelItem.code} mobile={4 * this.props.columnSize} tablet={2 * this.props.columnSize} computer={this.props.columnSize}>
                                            <Form.Checkbox
                                                name={this.props.fieldName}
                                                checked={this.props.panelSelectedItems ? this.props.panelSelectedItems.includes(panelItem.code) : false}
                                                label={panelItem.forcedName ? panelItem.forcedName : I18n.t('label.' + panelItem.code.replace(/\./g, '_'))}
                                                value={panelItem.code}
                                                onChange={this.props.handleCheckboxChange}
                                            /></Grid.Column>);
                                    }
                                )
                                : null
                        }
                    </Grid>
                </Form.Group>
            </div>
        );
    }
}

export default RealestateDetailsCheckboxPanel;