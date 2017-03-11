# Blocks

<!-- toc -->

Blocks are Sutra CMS’s abstractions for adding content types (and
functionality) to a page. Blocks are added to editable areas of a page
and can be arranged and ordered however you like.

Blocks come in many shapes and sizes (metaphorically). From content
creation editors like WYSIWYG and markdown, simple “contact us” type
forms, file managers, hero unit displays, navigation, fully interactive
applications — whatever you can imagine — can be articulated with a
block.


## Default blocks

Sutra CMS comes with a set of default blocks for WYSIWYG content,
navigation, page links, search, images, code formatted output, html
insertion, etc.

When you add a block to your site you are presented with the full list
of blocks to choose from. When you create a new site record, a number of
blocks are added for you automatically.

The default blocks live in the `_dsa_mosaic_WEB_cms_blocks` module.
Various forms in this module are used to define each block. Additional
blocks may be added here with successive updates to Sutra CMS.


## Block builder

Depending on your site design and content creation guidelines, some
content could use an additional layer of structure than that afforded to
you by the basic set of content blocks.

Of course you can code blocks with the specific structure you need but
this requires a programmer and an update to the server.

The block builder is a tool that allows designers and content creators
to build structures of content without needing access to the coding
layer. This is done by assembling and ordering a collection of fields,
each of which has pre and post hooks to wrap each field in html. Each
field type can also be specified as required and if it is allowed to
repeat.

*See [Block Builder](../developer/block-builder) for details.*


## Custom blocks

The extent of what Sutra CMS can accomplish is realized when you start
coding your own custom blocks. Using this approach you can create blocks
that leverage enterprise resources server-side, use client-side
javascript libraries for UI effects, grab data via web services, etc.

Servoy is the IDE that you use to develop with. Advanced form based
development, javascript for your business logic, any JDBC compliant
database as your data source—all integrated together with an advanced
debugger.

Additionally, the Sutra CMS API includes a lot of functionality to help
with the heavy lifting.

*See [Coding a Block](../developer/coding-a-block) for details.*


## Servoy Web Client Block

Sutra CMS comes with a special block worth its own mention: the Servoy
Web Client (SWC) block.

This block allows you to easily assign any SWC form to a page by simply
selecting your SWC module and form from selector fields (we go grab all
the available modules and forms for you). So if you don’t like the
complexities of client-side web programming and want to speed things up,
code your business logic with Servoy Web Client and then just include
anywhere on your site.

*See [Servoy Web Client Block](../developer/webclient-block) for details.*