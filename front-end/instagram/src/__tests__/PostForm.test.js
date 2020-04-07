import React from "react";
import PostForm from "../components/Postform.js";
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });
global.URL.createObjectURL = jest.fn();

/*UPLOAD FORM TEST*/
describe('PostForm', () => {
  it("renders", () => {
    shallow(<PostForm />);
  });
  it("Fill form, submit and verify post method call to API", () => {
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ message: 'uploaded'}))
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
    let form_data = new FormData();
    form_data.append("picture", file, file.name);
    form_data.append("caption", captionInput.props().value);
    form_data.append("img_filter", '');
    const mockFn = jest.fn( localStorage.setItem )
    localStorage.setItem = mockFn
    localStorage.setItem( 'token', 'a229238812312')
    wrapper.find('form').at(0).simulate('submit', {
    preventDefault: () => {},
    })
    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:8000/api/post/create", form_data, {"headers": {"Authorization": "Token a229238812312", "content-type": "multipart/form-data"}})
  })
})