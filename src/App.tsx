import NotesBoard from "./components/NotesBoard";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <span className="app-title">StickyBoard</span>
      </header>

      <NotesBoard />
      
    </div>
  );
}
