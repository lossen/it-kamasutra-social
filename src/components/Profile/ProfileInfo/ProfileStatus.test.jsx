import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';


describe('Profile status component', () => {
    const testStatusStr = 'Test status';
    const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}/>);
    test('Status from props should be in state', () => {
        let statusInSpan = component.toJSON().children[0].children[1]
        expect(statusInSpan).toBe(testStatusStr)
    })
    test('First time should be span not input', () => {
        // let instance = component.root;
        // let span = instance.findByType('span')
        // console.log(span,'span')
        let child = component.toJSON().children[0]
        expect(child.type).toBe('span')
    })
    test('Callback should be called', () => {
        let mockCallback = jest.fn();
        const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr} updateProfileStatus={mockCallback}/>);
        component.toJSON().children[0].props.onDoubleClick();
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})