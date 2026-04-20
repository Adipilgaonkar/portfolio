function App() {
  const data = window.__PORTFOLIO_DATA__;

  return (
    <div className="shell">
      <Nav/>
      <Hero data={data}/>
      <Chat data={data}/>
      <Projects data={data}/>
      <Experience data={data}/>
      <Skills data={data}/>
      <Impact data={data}/>
      <Principles/>
      <Education data={data}/>
      <Contact data={data}/>
      <Footer data={data}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
