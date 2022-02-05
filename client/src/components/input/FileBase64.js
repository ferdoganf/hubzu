import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Button } from 'semantic-ui-react'

export default class FileBase64 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
        this.fileInputRef = React.createRef();
    }

    handleChange(e) {

        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {

                // Make a fileInfo Object
                let fileInfo = {
                    code: null,
                    name: file.name,
                    type: file.type,
                    key: file.name + '_' + file.size + '_' + file.type,
                    size: file.size,
                    base64: reader.result,
                    file: file,
                    url: URL.createObjectURL(file)
                };

                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length === files.length) {
                    // Apply Callback function
                    if (this.props.multiple) this.props.onDone(allFiles);
                    else this.props.onDone(allFiles[0]);
                }

            } // reader.onload

        } // for

    }

    render() {
        return (
            <div>
                <Button
                    style={this.props.style}
                    content={I18n.t('button.CHOOSE_PICTURES')}
                    labelPosition="left"
                    icon="picture"
                    secondary
                    onClick={() => this.fileInputRef.current.click()}
                />
                <input
                    ref={this.fileInputRef}
                    hidden
                    type="file"
                    onChange={this.handleChange.bind(this)}
                    multiple={this.props.multiple}
                    accept="image/gif, image/jpeg, image/png" />
            </div>
        );
    }
}

FileBase64.defaultProps = {
    multiple: false,
};