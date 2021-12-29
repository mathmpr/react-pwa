import './Details.css';
import Fetch from "../../../classes/Fetch";
import config from "../../../config";

class Details extends Fetch {

    cards: any = [];
    current_person_object: any = null;
    person_id: any = null;

    fetchPerson() {
        fetch(config.baseUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "query={persons{find(id: \"" + this.person_id + "\")}}"
        }).then((response) => {
            return response.blob();
        }).then((response) => {
            response.text().then((text) => {
                this.current_person_object = JSON.parse(text).data.persons.find;
                this.forceUpdate();
            })
        });
    }

    componentDidMount() {

        // get person id fro URI
        this.person_id = (this.props as any).match.params.id;

        super.componentDidMount();
        // find person by id
        this.fetchPerson();

        let context = (event: any) => {
            this.person_id = event.detail.value;
            this.current_person_object = null;
            this.fetchPerson();
        }
        window.removeEventListener('card-click', context);
        window.addEventListener('card-click', context);

    }

    render() {

        let person_object = this.current_person_object;

        return (
            <>
                {this.search}
                <div className="container-fluid">
                    <div className="row">
                        <div className="container">
                            {person_object &&
                            <div id="person" className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="image">
                                            <img src={person_object.picture} alt={person_object.name}/>
                                        </div>
                                        <div className="col">
                                            <p>Name: {person_object.name}</p>
                                            <p>Age: {person_object.age}</p>
                                            <p>E-mail: {person_object.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 friends">
                                    <h2>Friends</h2>
                                    <div className="row cards">
                                        {(person_object as any).friends.map((item: any) => {
                                            return this.renderCard(item, false);
                                        })}
                                    </div>
                                </div>
                            </div>
                            }
                            {this.data &&
                            <div className="row cards">
                                {this.data.map(this.renderCard)}
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    };
}

export default Details;
