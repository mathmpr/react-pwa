import './Home.css';
import Fetch from "../../../classes/Fetch";

class Home extends Fetch {

    cards: any = [];

    componentDidMount() {
        super.componentDidMount();
        // begin with full person list
        this.fetchData();
    }

    render() {

        document.title = 'Home - Search persons';

        return (
            <>
                {this.search}
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            {this.data != null &&
                            <div className="row">
                                {this.data.map(this.renderCard)}
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }


}


export default Home;
