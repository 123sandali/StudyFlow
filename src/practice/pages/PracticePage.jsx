import ClassContextConsumer from '../ClassContextConsumer';
import ClassCounter from '../ClassCounter';
import ClassLifecycle from '../ClassLifecycle';
import UncontrolledForm from '../UncontrolledForm';
import '../practice.css';

export default function PracticePage() {
  return (
    <section className="practicePage">
      <div className="practiceIntro">
        <h1>React Practice Lab</h1>

        <p>
          Isolated demonstrations for class components,
          lifecycle methods, refs, uncontrolled forms, and
          Context.
        </p>
      </div>

      <div className="practiceGrid">
        <article className="practiceCard">
          <div className="practiceCardHeader">
            <span className="practiceTag">
              Class state
            </span>

            <h2>Class counter</h2>
          </div>

          <p className="practiceCardText">
            Compare class state and setState with functional
            components and useState.
          </p>

          <ClassCounter />
        </article>

        <article className="practiceCard">
          <div className="practiceCardHeader">
            <span className="practiceTag">
              Lifecycle
            </span>

            <h2>Class lifecycle</h2>
          </div>

          <p className="practiceCardText">
            Observe mounting, updating, and unmounting
            behaviour.
          </p>

          <ClassLifecycle />
        </article>

        <article className="practiceCard">
          <div className="practiceCardHeader">
            <span className="practiceTag">
              Class Context
            </span>

            <h2>Context in a class component</h2>
          </div>

          <p className="practiceCardText">
            This component reads the same UserContext used by
            functional components, but through static
            contextType.
          </p>

          <ClassContextConsumer />
        </article>

        <div className="practiceFormSection">
          <UncontrolledForm />
        </div>
      </div>
    </section>
  );
}