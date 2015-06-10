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

        var multiView = '.multi-view',
            nav = '.nav',
            navItem = nav+' ul li a',
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
         * multi view nav item click function
         */
        $(multiView+" "+navItem).click(function(e){
            e.preventDefault();
            multiViewPanelSwitch(this);
        });

        /**
         * multi view min-height set
         */
        function multiViewMinHeight(){
            $(multiView+" "+content).css('min-height', $(multiView).height());
        }

        /**
         * multi view panel show/hide function
         * @param {object} activeNavItem;
         */
        function multiViewPanelSwitch(activeNavItem){
            $(activeNavItem).closest(multiView).find(navItem).removeClass('active');
            $(activeNavItem).addClass('active');
            $(activeNavItem).closest(multiView).find(contentItem).hide();
            $(activeNavItem).closest(multiView).find(contentItem+'[data-multi-view='+$(activeNavItem).attr('href')+']').show();
        }

        /**
         * multi view "min-height" set
         */
        function multiViewDefaultActiveState(){
            $(multiView+" "+navItem).each(function(){
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