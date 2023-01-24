// Class components have lifecycle methods. These for the most part are what useEffect does for function components. They're for doing things like making API calls, starting and ending transitions/animations, debugging, and other things like that. We don't need to use any here, but let's look at a few of the most common ones
// constructor isn't necessarily a React lifecylce method but we use it like one. It's where you do things that need to happen before the first render. Generally it's where you set the initial state.
// componentDidMount is a function that's called after the first rendering is completed. This pretty similar to a useEffect call that only calls the first time. This is typically where you want to do data fetching. It doesn't have to be async; we just made it async here to make the data fetching easy.
// componentDidUpdate is called after your state is updated. If you're doing something like Typeahead where you're making reactive requests to an API based on user input, this would be an ideal place to do it.
// componentWillUnmount is typically a place for cleanup. Let's say you had to write a component to integrate with jQuery (I've had to write this, multiple times), this is where you'd clean up those references (like unattaching from DOM nodes and deleting them) so you don't leak memory. This method is invoked whenever a component is about to be destroyed.
// This class doesn't cover all the lifecycle methods but you can imagine having different timings for different capabilities of a component can be useful. For example, if you have a set of props that come in and you need to filter those props before you display them, you can use getDerivedStateFromProps. Or if you need to react to your component being removed from the DOM (like if you're subscribing to an API and you need to dispose of the subscription) you can use componentWillUnmount.
import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

// React.Component is a generic, in that it can accept other types. Here we're telling it what its state and props will look like. We start the interfaces off with a capital I because this signifies that this is an interface. This is a common pattern and one TSLint enforced but ESLint doesn't by deafult.
// We could specify an IState as well as a second parameter to the Component generic but since we have the state = {} it can infer that without us doing that.
class Carousel extends Component<IProps> {
  // Class properties, no need for constructor.
  state = {
    active: 0,
  };

  // In case you don't pass props to this component. This allows us to always assume that the photos prop is going to be an array instead of having to do a bunch of "if this thing exists" logic.
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // It's arrow function because we need the "this" in handleIndexClick to be the correct "this". An arrow function assures that because it will be the scope of where it was defined. This is common with how to deal with event handlers with class components.
  // We need to type the event type coming back from the DOM. We know it'll come from an HTML element, and we have to make sure it's not a generic window event. TypeScript forces a lot of this defensive programming.
  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        // The data attribute comes back as a string. We want it to be a number, hence the +.
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    // The mutable state of the component (like useState). You'll use this.setState to mutate it (don't modify it directly.)
    const { active } = this.state;
    // Comes from the parent component, similar to parameter given to the render functions that we pull props out of.
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
