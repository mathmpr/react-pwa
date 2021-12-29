import './Search.css';
import {Link} from "react-router-dom";

function Search() {

    let emitSearch = (event: any) => {
        const customEvent = new CustomEvent('searching', {detail: {value: event?.target?.value}});
        window.dispatchEvent(customEvent);
    }

    return (
        <>
            <div id="search" className="container-fluid">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="logo">
                                <Link to="/">
                                    <h1>My Social</h1>
                                </Link>
                            </div>
                            <div className="col">
                                <input placeholder="search" onKeyUp={emitSearch} className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Search;
