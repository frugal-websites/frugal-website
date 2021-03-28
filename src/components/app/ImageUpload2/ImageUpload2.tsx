import React, { Component } from "react"
import { DropzoneArea } from "material-ui-dropzone"

// TODO clean-up
export class ImageUpload2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
    }
  }

  componentDidMount() {}

  handleChange(files) {
    this.setState({
      files: files,
    })
  }
  render() {
    return (
      <DropzoneArea
        acceptedFiles={["image/*"]}
        filesLimit={10}
        dropzoneText={"Drag and drop an image here or click aa"}
        onChange={this.handleChange.bind(this)}
        // showPreviews={true}
        // showPreviewsInDropzone={true}
        // showFileNamesInPreview={true}
        showFileNames={true}
        onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
      />
    )
  }
}

// Conclusion don't use "material-ui-dropzone" use your own code
// No dropzone it's not worth it

// See https://github.com/dabit3/amplify-photo-sharing-workshop for details on how to do it.
