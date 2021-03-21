# re-petir

re-petir provides a repeating web component.  It extends [i-bid](https://github.com/bahrus/ib-id).  Whereas i-bid has [no support for light children](https://github.com/bahrus/ib-id#what-if-i-want-to-repeat-some-web-components-that-require-non-shadow-light-children), re-peter does.  It uses github's [template parts library](https://github.com/github/template-parts/) to populate the light children.

## Sample syntax

```html
<template id=light-children>
    <span>{{msg}}</span>
</template>
<ul>
    <li>header</li>
    <re-petir id=repetir template-map-ids='{"li":"/light-children"}'></re-petir>
    <li>footer</li>
</ul>
<script type=importmap>
{
    "imports":{
        "xtal-element/": "../node_modules/xtal-element/",
        "trans-render/": "../node_modules/trans-render/",
        "ib-id/": "../node_modules/ib-id/",
        "@github/": "../node_modules/@github/"
    }
}
</script>
<script type=module>
    import 're-petir/re-petir.js';
</script>

<script>
    repetir.list = [
        {msg: 'hello 1'},
        {msg: 'hello 2'},
        {msg: 'hello 3'},
        {msg: 'hello 4'}
    ];
    setTimeout(() => {
        repetir.list = [
            {msg: 'hello 3'},
            {msg: 'hello 4'}
        ];
        setTimeout(() => {
            repetir.list = [
                {msg: 'hello 1'},
                {msg: 'hello 2'},
                {msg: 'hello 3'},
                {msg: 'hello 4'}
            ];
        }, 10000)
    }, 10000);
</script>
```

## Viewing the component locally

1.  Install git
2.  Clone or fork repo https://github.com/bahrus/repetir
3.  Install node
4.  Open command window from cloned location of step 2.
5.  Run command "npm run install"
6.  Run command "npm run serve"
7.  Open browser to http://localhost:3030/demo/dev

