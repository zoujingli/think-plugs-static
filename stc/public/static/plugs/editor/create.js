define(['wangEditor', 'upload'], function (editor) {
    window.wangEditor = editor;
    window.createEditor = function (ele, option) {
        if ($(ele).data('editorLayout')) return;
        const $layout = $('<div style="border:1px solid #ccc;z-index:1001;"><div style="border-bottom:1px solid #ccc;"></div><div style="height:400px;"></div></div>');
        $(ele).hide().data('editorLayout', $layout).after($layout).parent();

        const _editor = editor.createEditor({
            html: '<p><br></p>',
            selector: $layout.find("div:last").get(0),
            config: {
                height: (option || {}).height || 500,
                MENU_CONF: {
                    uploadImage: {
                        async customUpload(file, insertFn) {
                            if (window.AdminUploadAdapter) {
                                new window.AdminUploadAdapter().upload([file], url => insertFn(url, file.name))
                            } else {
                                let reader = new window.FileReader();
                                reader.addEventListener('load', () => insertFn(reader.result, file.name));
                                reader.readAsDataURL(file);
                            }
                        }
                    },
                    uploadVideo: {
                        async customUpload(file, insertFn) {
                            if (window.AdminUploadAdapter) {
                                new window.AdminUploadAdapter().upload([file], url => insertFn(url, file.name))
                            } else {
                                let reader = new window.FileReader();
                                reader.addEventListener('load', () => insertFn(reader.result, file.name));
                                reader.readAsDataURL(file);
                            }
                        }
                    }
                },
                placeholder: 'Type here...',
                onCreated(editor) {
                    editor.setHtml($(ele).val());
                },
                onChange(editor) {
                    $(ele).val(editor.getHtml())
                }
            },
            mode: 'default', // or 'simple'
        })
        editor.createToolbar({
            editor: _editor,
            selector: $layout.find('div:first').get(0),
            config: {
                excludeKeys: ['fullScreen']
            },
            mode: 'default',
        })
    }
})