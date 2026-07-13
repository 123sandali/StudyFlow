import * as React from 'react';
import './notes.css';

const ActivityShell =
  React.Activity ??
  function ActivityFallback({ mode, children }) {
    return (
      <div hidden={mode === 'hidden'} aria-hidden={mode === 'hidden'}>
        {children}
      </div>
    );
  };

const sampleContent = `<h2>React custom hooks</h2>
<p>A custom hook lets us reuse stateful logic without duplicating code inside components.</p>
<ul>
  <li>useArray handles immutable array operations.</li>
  <li>useLocalStorage persists state in the browser.</li>
  <li>useFetch manages loading, error, and data states.</li>
</ul>`;

export default function NotesPage() {
  const [content, setContent] = React.useState(sampleContent);
  const [showEditor, setShowEditor] = React.useState(true);

  return (
    <div className="notesPage">
      <section className="notesHeader">
        <div>
          <p className="notesEyebrow">Notes</p>
          <h1 className="notesTitle">HTML preview lab</h1>
          <p className="notesSubtitle">
            This page demonstrates controlled textarea state, preserved editor
            state, and an HTML preview using dangerouslySetInnerHTML.
          </p>
        </div>

        <button
          className="notesToggleButton"
          type="button"
          onClick={() => setShowEditor((currentValue) => !currentValue)}
        >
          {showEditor ? 'Hide editor' : 'Show editor'}
        </button>
      </section>

      <section className="notesWarning card">
        <strong>Safety warning:</strong> dangerouslySetInnerHTML can create XSS
        security risks if the HTML comes from untrusted users or external
        sources. In this learning demo, preview only content you type yourself.
        In a production app, sanitize HTML before rendering.
      </section>

      <section className="notesGrid">
        <ActivityShell mode={showEditor ? 'visible' : 'hidden'}>
          <div className="noteEditorCard card">
            <label className="noteLabel" htmlFor="noteContent">
              Note HTML content
            </label>

            <textarea
              id="noteContent"
              className="noteTextarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={14}
            />

            <p className="noteHint">
              Hide the editor and show it again. The text should still be there
              because the editor remains mounted.
            </p>
          </div>
        </ActivityShell>

        <div className="notePreviewCard card">
          <p className="noteLabel">Live preview</p>

          <div
            className="notePreview"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </div>
  );
}