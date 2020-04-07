import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import PostForm from "../components/Postform.js";
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
global.URL.createObjectURL = jest.fn();
/*UPLOAD FORM TEST*/
describe('PostForm', () => {
  it("renders", () => {
    shallow(<PostForm />);
  });
  it("Fill form, submit and get a response from API post method", () => {
    axios.post.mockImplementation(() => Promise.resolve({ message: 'uploaded'}))
    const wrapper = shallow(<PostForm />)
    let captionInput = wrapper.find('#content')
    captionInput.simulate('change', {
      target: { value: 'this is a test caption'}
    })
    captionInput = wrapper.find('#content')
    expect(captionInput.props().value).toEqual('this is a test caption')
    let uploadPhoto = wrapper.find('#myInput')
    const file = new File(['test'], 'test.jpg', { type: 'image/png' })
    uploadPhoto.simulate('change', {
      target: {
        files: [file]
      }
    })
    const mockFn = jest.fn( localStorage.setItem )
    localStorage.setItem = mockFn
    localStorage.setItem( 'token', 'a229238812312')
    wrapper.find('form').at(0).simulate('submit', {
    preventDefault: () => {},
    })
    /* Our image file and caption are in the right format and working correctly or else formData in Postform would through an error
    after clicking submit and going into handleSubmit().
    */
    expect(axios.post).toHaveBeenCalled()
  })
})