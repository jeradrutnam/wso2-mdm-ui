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

var addFormFunction = (function(){
    var returnObj = {};
    returnObj.init = function(){

        var addButton = '[data-click-event=add-form]',
            removeButton = '[data-click-event=remove-form]',
            helpText = '[data-help-text=add-form]';

        /**
         * add form button click function
         */
        $(addButton).click(function(e){
            e.preventDefault();

            var addFormContainer = $('[data-add-form-container='+$(this).attr('href')+']');

            var clonedForm = $(addFormContainer)
                .clone()
                .find('[data-add-form='+$(this).attr('href')+']')
                .find('[data-add-form-element=clone]')
                .attr('data-add-form-clone', $(this).attr('href'));

            /**
             * remove form button click function
             */
            $(clonedForm).find(removeButton).bind('click', function(){
                e.preventDefault();
                $(this).closest('[data-add-form-element=clone]').remove();
                setId(addFormContainer);
                showHideHelpText(addFormContainer);
            });

            $(addFormContainer).append(clonedForm);
            setId(addFormContainer);
            showHideHelpText(addFormContainer);

            /**
             * focus + scroll to newly added form
             */
            $('body').animate({
                scrollTop: $(addFormContainer).find('[data-add-form-clone]').last().offset().top
            }, 400);
        });

        /**
         * set count id to cloned elements
         * @param {object} addFormContainer
         */
        function setId(addFormContainer){
            $(addFormContainer).find('[data-add-form-clone]').each(function(i){
                $(this).attr('id', $(this).attr('data-add-form-clone').slice(1)+'-'+(i+1));
                if($(this).find('legend .count').length > 0) {
                    $(this).find('legend .count').html(i+1);
                }
            });
        }

        /**
         * set count id to cloned elements
         * @param {object} addFormContainer
         */
        function showHideHelpText(addFormContainer){
            if($(addFormContainer).find('[data-add-form-clone]').length > 0) {
                $(addFormContainer).find(helpText).hide();
            }
            else{
                $(addFormContainer).find(helpText).show();
            }
        }

    };
    return returnObj;
})();

$(function(){
    addFormFunction.init();
});