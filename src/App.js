import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      senders: {

      }
    }
  }

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result).toString();
      const messages = text.split('\n');
      let senders = {};
      messages.forEach(m => {
        if (m.split('to')[1] !== undefined)
        {
          const sender = (m.split('to')[0]).split('From')[1];
          const reciever = (m.split('to')[1]).split(':')[0];
          const answer = m.substring(m.lastIndexOf(':') + 1);
          const time = m.split(" ")[0];

          if (sender in senders)
          {
            senders[sender] = [...senders[sender], { sender, reciever, answer, time }];
          } else
          {
            senders[sender] = [{ sender, reciever, answer, time }];
          }

        }
      });

      this.setState({
        messages: text.split('\n'),
        senders
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
        {Object.entries(this.state.senders).map(([sender, messages], index) => {
          return (
            <section key={index} className="w-full p-2 border border-gray-300 my-4 bg-gray-100">
              <h1 className="text-2xl">Sent by: {sender}</h1>
              {messages.map((m, index) => {
                return (

                  <div key={index} className="rounded-md border p-3 my-4 hover:shadow-md hover:border-blue-900 bg-white">

                    <header className="flex justify-between items-center">
                      <div className="flex">
                        <h1 className="font-meduim">
                          <span className="font-bold">Sender:</span> {sender}
                        </h1>
                        <span className="mx-2 font-bold">
                          To
               </span>
                        <h2 className="font-meduim">
                          {m.reciever}
                        </h2>
                      </div>

                      <h2 className="text-blue-900">
                        Time: {m.time}
                      </h2>
                    </header>

                    <main>
                      <h1>Answer is</h1>
                      <p>
                        {m.answer}
                      </p>
                    </main>
                  </div>
                );
              })}
            </section>
          );
        })}


      </div>
    </div>
    )
  }
}

export default App;
