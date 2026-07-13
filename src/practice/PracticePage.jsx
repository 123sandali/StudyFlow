import ClassCounter from '../../../practice/ClassCounter';
import ClassLifecycle from '../../../practice/ClassLifecycle';
import UncontrolledForm from '../../../practice/UncontrolledForm';
import '../practice.css';

export default function PracticePage() {
  return (
    <section className="practicePage">
      <div className="practiceIntro">
        <h1>React Practice Lab</h1>

        <p>
          Isolated demonstrations for class components,
          lifecycle methods, refs, and uncontrolled forms.
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

        <div className="practiceFormSection">
          <UncontrolledForm />
        </div>
      </div>
    </section>
  );
}