import * as React from "react";
import { FormControl } from "react-bootstrap";

import "../styles/Query.css";


class Query extends React.Component<Query_P, object> {
    constructor(props: Query_P) {
        super(props);
        this.onChange_Response1 = this.onChange_Response1.bind(this);
        this.onEvent_Response1 = this.onEvent_Response1.bind(this);
    }

    // Event handler functions
    onChange_Response1(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onUpdateText(e.target.value);
    }
    onEvent_Response1(e: React.KeyboardEvent<FormControl & HTMLInputElement>): void {
        if (e.key === "Enter") {
            this.props.onSubmitText();
        }
    }

    render() {
        const {query, content, Response_className} = this.props;
        return(
            <div>
                <p className="Query">
                    {query}
                </p>

                <input 
                    type="text" 
                    className={Response_className}
                    autoFocus={true}
                    value={content}
                    onChange={this.onChange_Response1}
                    onKeyDown={this.onEvent_Response1}
                />
            </div>
        );
    }
  }



export default Query;