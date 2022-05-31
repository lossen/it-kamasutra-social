import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

let mockCallback = jest.fn();

beforeEach(() => {
    mockCallback.mockClear();
});
describe('Profile status component', () => {
    const testStatusStr = 'Test status';
    test('Status from props should be in state', () => {
        const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}
                                                             updateProfileStatus={mockCallback}/>);
        let statusInSpan = component.toJSON().children[0].children[1];
        expect(statusInSpan).toBe(testStatusStr);
    });
    test('First time should be span not input', () => {
        // let instance = component.root;
        // let span = instance.findByType('span')
        // console.log(span,'span')
        const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}
                                                             updateProfileStatus={mockCallback}/>);
        let child = component.toJSON().children[0];
        expect(child.type).toBe('span');
    });
    test('Callback should be called', () => {
        const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}
                                                             updateProfileStatus={mockCallback}/>);
        component.toJSON().children[0].props.onDoubleClick();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});