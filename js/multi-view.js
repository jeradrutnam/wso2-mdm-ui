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

var multiViewFunction = (function(){
    var returnObj = {};
    returnObj.init = function(){

        var multiViewContainer = '.multi-view',
            navButton = '[data-click-event=multi-view]',
            nav = '.nav',
            content = '.content',
            contentItem = content+' ul li';

        /**
         * on page load init functions
         */
        $(document).ready(function(){
            multiViewMinHeight();
            multiViewDefaultActiveState();
        });

        /**
         * on multi view resize multi view nav min-height set
         * @require jquery.resize.js
         */
        $(multiViewContainer).resize(function(){
            multiViewMinHeight();
        });

        /**
         * multi view nav item click function
         */
        $(navButton).click(function(e){
            e.preventDefault();
            if($(this).attr('data-multi-view-behavior') == 'collapse'){
                $(this).siblings('ul').slideToggle(function(){
                    if($(this).css('display') == 'none'){
                        $(this).siblings('a')
                            .find('.slide-icon')
                            .removeClass('fw-up-arrow')
                            .addClass('fw-down-arrow');

                        multiViewMinHeight();
                    }
                    else {
                        $(this).siblings('a')
                            .find('.slide-icon')
                            .removeClass('fw-down-arrow')
                            .addClass('fw-up-arrow');

                        multiViewMinHeight();
                    }
                });
            }
            else {
                multiViewPanelSwitch(this);
            }
        });

        /**
         * multi view min-height set
         */
        function multiViewMinHeight(){
            $(multiViewContainer+" "+content).css('min-height', $(multiViewContainer+" "+nav).height());
        }

        /**
         * multi view panel show/hide function
         * @param {object} activeNavItem
         */
        function multiViewPanelSwitch(activeNavItem){
            $(activeNavItem).closest(multiViewContainer).find(navButton).removeClass('active');
            $(activeNavItem).addClass('active');

            $(activeNavItem).closest(multiViewContainer).find(contentItem).hide();

            if($(activeNavItem).closest('li').find('ul').length > 0){
                $(activeNavItem).closest('li').find('ul li a').each(function(){
                    $(this).closest(multiViewContainer)
                        .find(contentItem+'[data-multi-view='+$(this).attr('href')+']')
                        .show();
                });
            }
            else{
                $(activeNavItem).closest(multiViewContainer)
                    .find(contentItem+'[data-multi-view='+$(activeNavItem).attr('href')+']')
                    .show();
            }
        }

        /**
         * multi view "min-height" set
         */
        function multiViewDefaultActiveState(){
            $(navButton).each(function(){
                if($(this).hasClass('active')){
                    multiViewPanelSwitch(this);
                    return false;
                }
            });
        }

    };
    return returnObj;
})();

$(function(){
    multiViewFunction.init();
});