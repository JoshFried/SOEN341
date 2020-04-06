import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import PostForm from "../components/Postform.js";
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/*UPLOAD FORM TEST*/


describe('PostForm', () => {
  it("renders", () => {
    mount(<PostForm />);
  });
  it("fill up form", () => {
    const wrapper = mount(<PostForm />)
    let captionInput = wrapper.find('input').first()
    captionInput.simulate('change', {
      target: { value: 'this is a test caption'}
    })
    expect(captionInput.props().value).toEqual('this is a test caption')
    })
})

