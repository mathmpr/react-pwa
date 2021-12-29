import './Card.css';
import React from "react";
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";

class Card extends React.Component<any> {

    person: any = null;
    linkable: boolean = true;

    constructor(props: any) {
        super(props);
        this.person = props.person;
        this.linkable = props.linkable;
    }

    cardClick(event: any, _id?: any) {
        if (!this.linkable && this.linkable !== undefined) {
            event.preventDefault()
            return;
        }
        const customEvent = new CustomEvent('card-click', {detail: {value: _id}});
        window.dispatchEvent(customEvent);
    }

    render() {

        const Card = styled.div`
          ${css`
          border: 1px solid var(--default-border-color);
          border-radius: 20px;
          padding: 15px; 
          margin-bottom: 30px;
          `}        
        `;

        const Ellipsis = styled.p`
          ${css`
          white-space: nowrap;                  
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: calc(1rem * 1.6);
          `}        
        `;

        return (
            <Card className={!this.linkable && this.linkable !== undefined ? 'no-hover-card' : 'hover-card'}>
                <Link onClick={(event) => this.cardClick(event, this.person._id)} to={"/details/" + this.person._id}>
                    <img src={this.person.picture} alt={this.person.name}/>
                    <Ellipsis>Name: {this.person.name}</Ellipsis>
                    <Ellipsis>E-mail: {this.person.email}</Ellipsis>
                    <Ellipsis>Eye color: {this.person.eyeColor}</Ellipsis>
                    <Ellipsis>Company: {this.person.company}</Ellipsis>
                </Link>
            </Card>
        );
    }

}

export default Card;
