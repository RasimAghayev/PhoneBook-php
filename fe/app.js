'use strict';

;( function ( document, window)
{
    let isAdvancedUpload = function () {
        let div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();
    let forms = document.querySelectorAll('.box');
    Array.prototype.forEach.call( forms, function( form )
    {
        let input = form.querySelector('input[type="file"]'),
            label = form.querySelector('label'),
            errorMsg = form.querySelector('.box__error span'),
            restart = form.querySelectorAll('.box__restart'),
            droppedFiles = false,
            showFiles = function (files) {
                label.textContent = files.length > 1 ? (input.getAttribute('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name;
            },
            triggerFormSubmit = function () {
                let event = document.createEvent('HTMLEvents');
                event.initEvent('submit', true, false);
                form.dispatchEvent(event);
            };
        let ajaxFlag = document.createElement('input');
        ajaxFlag.setAttribute( 'type', 'hidden' );
        ajaxFlag.setAttribute( 'name', 'ajax' );
        ajaxFlag.setAttribute( 'value', 1 );
        form.appendChild( ajaxFlag );
        input.addEventListener( 'change', function( e )
        {
            showFiles( e.target.files );
            triggerFormSubmit();
        });
        if( isAdvancedUpload )
        {
            form.classList.add( 'has-advanced-upload' );
            [ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( function( event )
            {
                form.addEventListener( event, function( e )
                {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            [ 'dragover', 'dragenter' ].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.add( 'is-dragover' );
                });
            });
            [ 'dragleave', 'dragend', 'drop' ].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.remove( 'is-dragover' );
                });
            });
            form.addEventListener( 'drop', function( e )
            {
                droppedFiles = e.dataTransfer.files;
                showFiles( droppedFiles );
                triggerFormSubmit();
            });
        }
        form.addEventListener( 'submit', function( e )
        {
            if( form.classList.contains( 'is-uploading' ) ) return false;
            form.classList.add( 'is-uploading' );
            form.classList.remove( 'is-error' );
            if( isAdvancedUpload )
            {
                e.preventDefault();
                let ajaxData = new FormData(form);
                if( droppedFiles )
                {
                    Array.prototype.forEach.call( droppedFiles, function( file )
                    {
                        ajaxData.append( input.getAttribute( 'name' ), file );
                    });
                }
                let ajax = new XMLHttpRequest();
                ajax.open( form.getAttribute( 'method' ), form.getAttribute( 'action' ), true );
                ajax.onload = function()
                {
                    form.classList.remove( 'is-uploading' );
                    if( ajax.status >= 200 && ajax.status < 400 )
                    {
                        let data = JSON.parse(ajax.responseText);
                        form.classList.add( data.success === true ? 'is-success' : 'is-error' );
                        if( !data.success ) errorMsg.textContent = data.error;
                    }
                    else alert( 'Error. Please, contact the webmaster!' );
                };
                ajax.onerror = function()
                {
                    form.classList.remove( 'is-uploading' );
                    alert( 'Error. Please, try again!' );
                };
                ajax.send( ajaxData );
            }
            else
            {
                let iframeName	= 'uploadiframe' + new Date().getTime(),
                    iframe;
                iframe= $( '<iframe name="' + iframeName + '" style="display: none;"></iframe>' );
                iframe.setAttribute( 'name', iframeName );
                iframe.style.display = 'none';
                document.body.appendChild( iframe );
                form.setAttribute( 'target', iframeName );
                iframe.addEventListener( 'load', function()
                {
                    let data = JSON.parse(iframe.contentDocument.body.innerHTML);
                    form.classList.remove( 'is-uploading' )
                    form.classList.add( data.success === true ? 'is-success' : 'is-error' )
                    form.removeAttribute( 'target' );
                    if( !data.success ) errorMsg.textContent = data.error;
                    iframe.parentNode.removeChild( iframe );
                });
            }
        });
        Array.prototype.forEach.call( restart, function( entry )
        {
            entry.addEventListener( 'click', function( e )
            {
                e.preventDefault();
                form.classList.remove( 'is-error', 'is-success' );
                input.click();
            });
        });
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
}( document, window, 0 ));
