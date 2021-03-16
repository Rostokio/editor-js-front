import ReactDOM from "react-dom";
import React, { Component } from "react";
import DragDrop from 'editorjs-drag-drop';
import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./constants";

class ReactEditor extends Component {

    constructor(props) {
        super(props);

        this.state ={ data: {}, isFetching: true, error: null };
    }

    componentDidMount() {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <EditorJs
                instanceRef={instance => this.editorInstance = instance}
                onReady={() => {
                    new DragDrop(this.editorInstance)
                }}
                tools={EDITOR_JS_TOOLS}
                data={this.state.data}
                enableReInitialize={true}
            />
        );
    }
}

ReactDOM.render(<ReactEditor />, document.getElementById("root"));
