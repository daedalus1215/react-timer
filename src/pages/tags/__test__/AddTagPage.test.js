import React from 'react';
import { createWrapperWithContext, findByTestId } from 'testUtils';
import AddTagPage from '../AddTagPage';
import useLoadinSpinnerContext from 'hooks/useLoadinSpinnerContext';
import useFlashMessageContext from 'hooks/useFlashMessageContext';
import { shallow } from 'enzyme';
jest.mock('hooks/useLoadinSpinnerContext');
jest.mock('hooks/useFlashMessageContext');

describe('src/pages/tags/__test__/AddTagPage.test.js', () => {
    // Arrange
    const flashMessageContext = {
        setSuccessFlashMessage: jest.fn().mockImplementation(),
        setErrorFlashMessage: jest.fn().mockImplementation()
    }
    useFlashMessageContext.mockReturnValue(flashMessageContext);

    describe('AddTagPage', () => {
        it('should be present', () => {
            // Arrange
            const wrapper = createWrapperWithContext(<AddTagPage />);

            // Act

            // Assert
            expect(wrapper).toEqual(expect.anything());
        });

        describe('#_submitForm', () => {
            // Arrange
            const loadinSpinnerContext = {
                setIsLoadin: jest.fn().mockImplementation()
            }
            useLoadinSpinnerContext.mockReturnValue(loadinSpinnerContext);

            it('should fetch data and display success when we get back anything but 500, and there is no error', async () => {
                // Arrange
                const tag = {
                    status: 200,
                    id: 'stub id',
                    name: 'another tag name',
                    description: 'tag description'
                }
                const responsePromise = Promise.resolve({
                    json: jest.fn().mockImplementation(() => Promise.resolve(tag))
                });
                global.fetch = jest.fn().mockImplementation(() => responsePromise);

                const expectedAPI = '/api/tag';
                const expectedAPIOptions = { "body": "{\"name\":\"tag name\",\"description\":\"tag description\"}", "headers": { "Content-Type": "application/json" }, "method": "POST" };

                const wrapper = shallow(<AddTagPage />);

                // Act
                await findByTestId(wrapper, 'addTagPageSubmit').props().onClick({
                    name: 'tag name',
                    description: 'tag description'
                });

                // Assert
                expect(global.fetch).toBeCalledWith(expectedAPI, expectedAPIOptions);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenCalledTimes(2);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(1, true);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(2, false);
                expect(flashMessageContext.setSuccessFlashMessage).toBeCalledWith(`Added Tag: ${tag.name}`);

                // Clean up
                global.fetch.mockClear();
                loadinSpinnerContext.setIsLoadin.mockClear();
                flashMessageContext.setSuccessFlashMessage.mockClear();
            });

            it('should fetch data and display error when done, when 500 status', async () => {
                // Arrange
                const tag = {
                    status: 500,
                    id: 'stub id',
                    name: 'another tag name',
                    description: 'tag description'
                }
                const responsePromise = Promise.resolve({
                    json: jest.fn().mockImplementation(() => Promise.resolve(tag))
                });
                global.fetch = jest.fn().mockImplementation(() => responsePromise);

                const expectedAPI = '/api/tag';
                const expectedAPIOptions = { "body": "{\"name\":\"tag name\",\"description\":\"tag description\"}", "headers": { "Content-Type": "application/json" }, "method": "POST" };
                
                const expectedFailedTag = {
                    name: 'tag name',
                    description: 'tag description'
                };
                
                const wrapper = shallow(<AddTagPage />);

                // Act
                await findByTestId(wrapper, 'addTagPageSubmit').props().onClick(expectedFailedTag);

                // Assert
                expect(global.fetch).toBeCalledWith(expectedAPI, expectedAPIOptions);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenCalledTimes(2);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(1, true);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(2, false);
                expect(flashMessageContext.setErrorFlashMessage).toHaveBeenNthCalledWith(1, `Problem creating new tag: ${expectedFailedTag.name}`);

                // Clean up
                global.fetch.mockClear();
                loadinSpinnerContext.setIsLoadin.mockClear();
                flashMessageContext.setErrorFlashMessage.mockClear();
            });
            
            it('should fetch data and display error when issue with Promise', async () => {
                // Arrange
                // const tag = {
                //     status: 500,
                //     id: 'stub id',
                //     name: 'another tag name',
                //     description: 'tag description'
                // }
                const responsePromise = Promise.resolve({
                    json: jest.fn().mockImplementation(() => Promise.reject())
                    
                });
                global.fetch = jest.fn().mockImplementation(() => responsePromise);

                const expectedAPI = '/api/tag';
                const expectedAPIOptions = { "body": "{\"name\":\"tag name\",\"description\":\"tag description\"}", "headers": { "Content-Type": "application/json" }, "method": "POST" };
                
                const expectedFailedTag = {
                    name: 'tag name',
                    description: 'tag description'
                };
                
                const wrapper = shallow(<AddTagPage />);

                // Act
                await findByTestId(wrapper, 'addTagPageSubmit').props().onClick(expectedFailedTag);

                // Assert
                expect(global.fetch).toBeCalledWith(expectedAPI, expectedAPIOptions);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenCalledTimes(2);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(1, true);
                expect(loadinSpinnerContext.setIsLoadin).toHaveBeenNthCalledWith(2, false);
                expect(flashMessageContext.setErrorFlashMessage).toHaveBeenNthCalledWith(1, `Problem creating new tag: ${expectedFailedTag.name}. Error: undefined`);

                // Clean up
                global.fetch.mockClear();
                loadinSpinnerContext.setIsLoadin.mockClear();
                flashMessageContext.setErrorFlashMessage.mockClear();
            });
        });
    });
});