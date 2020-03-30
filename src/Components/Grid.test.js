import React from 'react'
import Grid from './Grid'
import { mount, render, shallow } from 'enzyme'
import {Button} from './Button'


it('Grid size equal to number of buttons :', () => {
  const grid = shallow( <Grid W={10} H={10} B={20} /> )
  expect( grid.state('completeGrid').length).toEqual( grid.find('Button').length )
})

it('All bombs in grid', () => {
  const grid = shallow( <Grid W={10} H={10} B={20} /> )
  var count = 0
  // console.log(grid.prop('B'));
  grid.state('grid').forEach( (line) => {
    count += (line.match(/B/g)|| []).length
  })
  expect(count).toEqual(20)
})
