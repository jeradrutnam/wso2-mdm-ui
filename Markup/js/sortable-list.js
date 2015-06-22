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

var sortableListFunction = (function(){
    var returnObj = {};
    returnObj.init = function(){

        var sortableElem = '.wr-sortable',
            sortUpdateBtn = '#sortUpdateBtn',
            sortableElemList = [],
            sortedIDs,
            currentElemId,
            sortableElemLength = $(sortableElem + ' .list-group-item').not('.ui-sortable-placeholder').length;

        for(var i = 1; i <= sortableElemLength; i++){
            sortableElemList.push(i.toString());
        }

        function addSortableIndexNumbers(){
            $(sortableElem + ' .list-group-item').not('.ui-sortable-placeholder').each(function(i){
                $('.wr-sort-index input.index', this).val(i+1);
                $(this).attr('data-sort-index', i+1);
            });
        }

        $(sortableElem).on('focus', '.wr-sort-index input.index', function(){
            currentElemId = $(this).val();
            $(this).autocomplete({
                source: sortableElemList,
                minLength: 0,
                close: function(event, ui){
                    if($.inArray($(this).val(), sortableElemList) !== -1){
                        $(this).removeClass('has-error');
                    }
                }
            });
        });

        $(sortableElem).on('click', '.wr-sort-index .icon', function(){
            $(this).siblings('input.index').focus();
        });

        $(sortableElem).on('keyup', '.wr-sort-index input.index', function(e){
            if (e.which == 13) {
                $(this).focusout();
            }
            else if ($.inArray($(this).val(), sortableElemList) == -1){
                $(this).addClass('has-error');
            }
            else {
                $(this).removeClass('has-error');
            }
        });

        $(sortableElem).on('blur', '.wr-sort-index input.index', function(){
            if(($(this).val() > 0) && ($(this).val() < sortableElemLength+1)){

                $(this).closest('.list-group-item').attr('data-sort-index', $(this).val());

                $(sortableElem + ' .list-group-item').not('.ui-sortable-placeholder').sort(function(a, b) {
                    return parseInt($(a).data('sort-index')) < parseInt($(b).data('sort-index'));
                }).each(function(){
                    var elem = $(this);
                    elem.remove();
                    $(elem).prependTo(sortableElem);
                });

                addSortableIndexNumbers();
            }
            else{
                $(this).val(currentElemId);
            }
            $(this).removeClass('has-error');
        });

        $(function() {
            addSortableIndexNumbers();

            $(sortableElem).sortable({
                beforeStop: function(event, ui){
                    sortedIDs = $(this).sortable('toArray');
                    addSortableIndexNumbers();
                    $(sortUpdateBtn).prop('disabled', false);
                }
            });
            $(sortableElem).disableSelection();
        });

        $(sortUpdateBtn).click(function(){
            console.log(sortedIDs);
            $(sortUpdateBtn).prop('disabled', true);
        });

    };
    return returnObj;
})();

$(function(){
    sortableListFunction.init();
});