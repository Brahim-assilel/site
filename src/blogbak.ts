[plugin:vite:esbuild] Transform failed with 1 error:
C:/Users/iCON/Documents/Projects/DEV/DEV/mon-app/src/data/blog.ts:21:11: ERROR: Expected ">" but found "className"
C:/Users/iCON/Documents/Projects/DEV/DEV/mon-app/src/data/blog.ts:21:11
Expected ">" but found "className"
19 |      category: "Développement",
20 |      content: (
21 |        <div className="prose prose-invert lg:prose-xl text-slate-300">
   |             ^
22 |          <p>
23 |            Le contenu de cet article est maintenant directement écrit en JSX dans un fichier TypeScript.
    at failureErrorWithLog (C:\Users\iCON\Documents\Projects\DEV\DEV\mon-app\node_modules\esbuild\lib\main.js:1467:15)
    at C:\Users\iCON\Documents\Projects\DEV\DEV\mon-app\node_modules\esbuild\lib\main.js:736:50
    at responseCallbacks.<computed> (C:\Users\iCON\Documents\Projects\DEV\DEV\mon-app\node_modules\esbuild\lib\main.js:603:9)
    at handleIncomingPacket (C:\Users\iCON\Documents\Projects\DEV\DEV\mon-app\node_modules\esbuild\lib\main.js:658:12)
    at Socket.readFromStdout (C:\Users\iCON\Documents\Projects\DEV\DEV\mon-app\node_modules\esbuild\lib\main.js:581:7)
    at Socket.emit (node:events:508:28)
    at addChunk (node:internal/streams/readable:559:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    at Readable.push (node:internal/streams/readable:390:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)