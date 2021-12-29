import config from "../config";
import React from "react";
import Search from "../components/search/Search";
import Card from "../components/card/Card";

class Fetch extends React.Component {

    public data: any = null;
    public term: any = '';
    search: any;

    constructor(props: any) {
        super(props);
        this.search = Search();
    }

    componentDidMount() {
        let context = (event: any) => {
            this.searching(event.detail.value);
        }
        window.removeEventListener('searching', context);
        window.addEventListener('searching', context);
    }

    renderCard(person: any, linkable: boolean = true) {
        return <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12" key={person._id}><Card linkable={linkable} person={person}/></div>
    }

    fetchData(term?: string) {
        console.log(term);
        this.term = term;
        let query = term ? "query={persons{list(search: \"" + term + "\")}}" : "query={persons{list}}"
        fetch(config.baseUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: query
        }).then((response) => {
            return response.blob();
        }).then((response) => {
            response.text().then((text) => {
                this.data = null;
                this.data = JSON.parse(text).data.persons.list;
                this.forceUpdate();
            })
        });
    }

    searching(term: any) {
        this.fetchData(term);
    };
}

export default Fetch;
