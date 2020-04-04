import React from 'react'
import { mount, render, shallow } from 'enzyme'
import Adapter from "enzyme-adapter-react-16";

import Grid from './Grid'
import Button from './Button'
import Clock from './Clock'

describe("Grid", () => {
  const props = {
    W: 1000,
    H: 1000,
    B: 800
  }
  const wrapper = mount(<Grid {...props} />)
  it("render", () => {
    wrapper
  });
  it("every cells are well mount", () => {
    expect(wrapper.find(Button).length).toBe(props.W * props.H)
  });

  it("Clock is render", () => {
    expect(wrapper.find(Clock).length).toBe(1)
  })
});
// it('Grid size equal to number of buttons :', () => {
//   const grid = shallow( <Grid W={10} H={10} B={20} /> )
//   expect( grid.state('completeGrid').length).toEqual( grid.find('Button').length )
// })

// it('All bombs in grid', () => {
//   const grid = shallow( <Grid W={10} H={10} B={20} /> )
//   var count = 0
//   // console.log(grid.prop('B'));
//   grid.state('grid').forEach( (line) => {
//     count += (line.match(/B/g)|| []).length
//   })
//   expect(count).toEqual(20)
// })
