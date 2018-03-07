import * as React from "react";
import { FormControl } from "react-bootstrap";

import "../styles/App.css";


class Child_C extends React.Component<Child_P, object> {
    constructor(props: Child_P) {
        super(props);
        this.onChange_Response1 = this.onChange_Response1.bind(this);
        this.onEvent_Response1 = this.onEvent_Response1.bind(this);
    }
    onChange_Response1(e: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onUpdateText(e.target.value);
    }
    onEvent_Response1(e: React.KeyboardEvent<FormControl & HTMLInputElement>): void {
        if (e.key === "Enter") {
            this.props.onSubmitText();
        }
    }
    
    asdf: Function;

    render() {
        return(
            <div className="">
                <p className="Query_C">
                    {this.props.query}
                </p>

                <input 
                    type="text" 
                    className={this.props.Response1_className}
                    autoFocus={true}
                    value={this.props.content}
                    onChange={this.onChange_Response1}
                    onKeyDown={this.onEvent_Response1}
                />
            </div>
        );
        }
  }



export default Child_C;