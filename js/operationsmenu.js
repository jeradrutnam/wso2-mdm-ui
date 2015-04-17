/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Setting-up global variables.
 */
var operations = '.wr-operations',
    modelPopup = '.wr-modalpopup',
    modelPopupContent = modelPopup + ' .modalpopup-content',
    deviceCheckbox = '#ast-container .ctrl-wr-asset .itm-select input[type="checkbox"]',
    showOperationsBtn = '#showOperationsBtn',
    maxOperationsLimit = 15;

/*
 * DOM ready functions.
 */
$(document).ready(function(){
    /* collapse operations to a toggle menu, if exceeds max operations limit */
   if($(operations + "> a").length > maxOperationsLimit){
       $(showOperationsBtn).show();
   }
    else{
       $(operations).show();
   }
});

/*
 * On Show Operations click operation show toggling function.
 */
function showOperations(){
    $(operations).toggle('slide');
}

/*
 * On operation click function.
 * @param selection: Selected operation
 */
function operationSelect(selection){
    $(modelPopupContent).html($(operations + ' .operation[data-operation='+selection+']').html());
    showPopup();
}

/*
 * On operation click function.
 * @param operation: Selected operation
 */
function runOperation(operation){
    console.log(operation);
}

/*
 * show popup function.
 */
function showPopup() {
    $(modelPopup).show();
}

/*
 * hide popup function.
 */
function hidePopup() {
    $(modelPopupContent).html('');
    $(modelPopup).hide();
}

/*
 * Function to get selected devices ID's
 */
function getSelectedDeviceIds(){
    var deviceIdentifierList = [];
    $(deviceCheckbox).each(function(index){
        var device = $(this);
        var deviceId = device.data('deviceid');
        var deviceType = device.data('type');
        deviceIdentifierList.push({
            "id" : deviceId,
            "type" : deviceType
        });
    });
    return deviceIdentifierList;
}