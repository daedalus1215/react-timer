import taskIdDispatch from '../taskIdDispatch';

describe('src/pages/createOrEditTask/form/__test__/taskIdDispatch.test.js', () => {
    describe('taskIdDispatch', () => {
        // Arrange
        const setTimeSpy = jest.fn().mockImplementation();
        const updateTaskSpy = jest.fn().mockImplementation();
        const setErrorFlashMessageSpy = jest.fn().mockImplementation();

        beforeEach(() => {
            setTimeSpy.mockReset();
            updateTaskSpy.mockReset();
            setErrorFlashMessageSpy.mockReset();
        });

        it("should call 'setTime' and 'updateTask' with no error message, when data has id.", () => {
            // Arrange
            const data = {
                _id: 1,
                time: 1000
            };
            const target = taskIdDispatch(setTimeSpy, updateTaskSpy, setErrorFlashMessageSpy);

            // Act
            target(data);

            // assert
            expect(setTimeSpy).toHaveBeenNthCalledWith(1, data.time);
            expect(updateTaskSpy).toHaveBeenNthCalledWith(1, data);
            expect(setErrorFlashMessageSpy).not.toHaveBeenCalled();
        });

        it("should call 'setTime' and 'updateTask' with error message, when data has no id.", () => {
            // Arrange
            const data = {
                time: 1000
            };
            const target = taskIdDispatch(setTimeSpy, updateTaskSpy, setErrorFlashMessageSpy);

            // Act
            target(data);

            // assert
            expect(setTimeSpy).toHaveBeenNthCalledWith(1, data.time);
            expect(updateTaskSpy).toHaveBeenNthCalledWith(1, data);
            expect(setErrorFlashMessageSpy).toHaveBeenCalledTimes(1);
        });
    });
});
