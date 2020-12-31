import React from "react";

class MemeGenerator extends React.Component {

    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.getMeme();
    }

    async getMeme() {
        console.log("memes");
        let result = await fetch("https://api.imgflip.com/get_memes");
        let response = await result.json();
        this.setState({
            allMemeImgs: response.data.memes
        })
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    
    render() {
        return (
            <div>
                <div>
                    <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange}></input>  
                        <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}></input> 
                        <button>Gen</button>
                    </form>
                </div>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator;