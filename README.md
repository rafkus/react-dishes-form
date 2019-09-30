This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### About
Form with conditionally displayed fields and server side validation. You can check successful response in console.

Check demo here: 

#### Technologies:
* redux-form
* material-ui
* axios

### To run this project type following commands

`git clone git@github.com:rafkus/react-dishes-form.git`

`cd ./react-dishes-form`

`npm install`

`npm start`

## Problems encountered
#### 1. Unnecessary data in submitted JSON.
Due to redux-form architecture submitted JSON may contain unnecessary data. We get undesirable behavior in following scenerio:
* user choose pizza
* user completes the entire form
* user changes dish type to `soup` or `sandwich`
* user completes form and clicks submit button.

Then submitted JSON contains details about `pizza` and other `dish`. It is due to poor implementation in redux-form. When `unregistered` action is dispatched fields are not removed from form. We can filter values in `submit` function. I didn't do that because additional dara are not a problem for server - response doesn't conaint any errors.  

Read more at: 
* https://github.com/erikras/redux-form/issues/2761
* https://github.com/erikras/redux-form/issues/2325

#### 2. Slider from Material UI 
redux-form does not handle change of value within MUI Slider. We have to handle it ourselfes. I didn't figure it out yet. I would follow this topic: https://github.com/erikras/redux-form/issues/369

redux-form-material-ui package is out of date.

There is no problem with custom input (type="range") but I have choosen faster option: input type="number".

#### 3. Preparation time format
Function for normalizing input is quite primitve. This causes editing of this input is not very comfortable. Scenario:
* if there is completed preparation time eg. 01:22:00 and you want to edit minutes then you mark values in the middle. After keydown one of the numbers is changed and your caret jumps to the end.

I would look for some "Duration" component.

### TODO 
* require all fields before submit.
* adjust Material UI Slider component or create custom slider component for `soup spiciness`
