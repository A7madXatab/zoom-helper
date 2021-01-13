import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result).toString();
      this.setState({
        messages: text.split('\n')
      })
    };
    reader.readAsText(e.target.files[0])
  }

  focusInput = () => {
    console.log("printed")
    console.log(document.getElementById('file').focus());
  }

  render = () => {

    return (<div className="w-full flex items-center justify-center flex-col">
      <header className="w-full bg-blue-900 px-2 py-10">
        <nav>

        </nav>
      </header>
      <div className="w-full md:w-8/12 pt-2">
        {/* <button onClick={this.focusInput} className="transition duration-200 ease-in px-3 py-1 border border-blue-900 rounded-md hover:bg-blue-900 hover:text-white">Choose File</button> */}
        <input id="file" type="file" onChange={(e) => this.showFile(e)} />
        {this.state.messages.map((m, index) => {
          if (m.split('to')[1] !== undefined)
          {
            const sender = (m.split('to')[0]).split('From')[1];
            const reciever = (m.split('to')[1]).split(':')[0]

            return (
              <div key={index} className="rounded-md border p-3 my-4 hover:shadow-md hover:border-blue-900 bg-white">

                <header className="flex">
                  <h1>
                    <span className="font-bold">Sender:</span> {sender}
                  </h1>
                  <span className="mx-2 font-bold">
                    To
                   </span>
                  <h2>
                    {reciever}
                  </h2>
                </header>

                <main>
                  <h1>Answer is</h1>
                  <p>
                    {m.substring(m.lastIndexOf(':') + 1)}
                  </p>
                </main>
              </div>
            );
          }

          return null;

        })}
      </div>
    </div>
    )
  }
}

export default App;
