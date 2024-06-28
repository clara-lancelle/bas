import React, { useState, useEffect } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding, KeyBindingUtil, EditorState, CompositeDecorator, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './RichTextEditor.css';
import linkIcon from '../../Images/Icons/link-grey-light.svg';
import ulIcon from '../../Images/Icons/unordered-list.svg';
import olIcon from '../../Images/Icons/ordered-list.svg';
import italicIcon from '../../Images/Icons/italic.svg';
import boldIcon from '../../Images/Icons/bold.svg';

const { hasCommandModifier } = KeyBindingUtil;
const MAX_CHARACTERS = 500;

// Définir un composant de lien pour appliquer le style
const LinkEditor = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: 'blue', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

// Définir une stratégie de lien pour trouver les entités de lien
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

// Définir le décorateur
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkEditor,
  },
]);

const RichTextEditor = ({ editorState, setEditorState }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  useEffect(() => {
    if (!editorState.getDecorator()) {
      setEditorState(EditorState.set(editorState, { decorator }));
    }
  }, [editorState, setEditorState]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  // Activation des outils utilisés (gras, italique...) 
  const toggleInlineStyle = (event, style) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

    // Activation des outils utilisés (listes...) 
  const toggleBlockType = (event, blockType) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleBeforeInput = (input, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength >= MAX_CHARACTERS) {
      return 'handled';
    }
    return 'not-handled';
  };

  const handlePastedText = (pastedText, html, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength + pastedText.length > MAX_CHARACTERS) {
      return 'handled';
    }
    return 'not-handled';
  };

  const confirmLink = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowLinkInput(false);
    setUrlValue('');
  };

  const toggleLink = (event) => {
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      if (linkKey) {
        setEditorState(RichUtils.toggleLink(editorState, selection, null));
      } else {
        setShowLinkInput(true);
      }
    }
  };

  const onUrlChange = (event) => {
    setUrlValue(event.target.value);
  };

  useEffect(() => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    }
  }, [editorState]);

  return (
    <>
      <div className="border z-[1]">
        <div className="editor-container">
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            placeholder="Présentez vous et mettez en avant votre parcours, vos atouts, votre personnalité, vos centres d’intérêt, attentes, etc."
            handleBeforeInput={handleBeforeInput}
            handlePastedText={handlePastedText}
          />
        </div>
        {showLinkInput && (
          <div className="link-input-container">
            <input
              type="text"
              value={urlValue}
              onChange={onUrlChange}
              placeholder="Entrez l'URL"
            />
            <button onClick={confirmLink}>Confirmer</button>
          </div>
        )}
        <div className="flex items-center gap-x-3 py-3 px-4 border-t">
          <button className='p-1 rounded-md hover:bg-slate-100' onClick={(event) => toggleInlineStyle(event, 'BOLD')}><img src={boldIcon} alt="Toggle Link" /></button>
          <button className='p-1 rounded-md hover:bg-slate-100' onClick={(event) => toggleInlineStyle(event, 'ITALIC')}><img src={italicIcon} alt="Toggle Link" /></button>
          <button className='p-1 rounded-md hover:bg-slate-100' onClick={(event) => toggleBlockType(event, 'unordered-list-item')}><img src={ulIcon} alt="Toggle Link" /></button>
          <button className='p-1 rounded-md hover:bg-slate-100' onClick={(event) => toggleBlockType(event, 'ordered-list-item')}><img src={olIcon} alt="Toggle Link" /></button>
          <button className='p-1 rounded-md hover:bg-slate-100' onClick={toggleLink}><img src={linkIcon} alt="Toggle Link" /></button>
        </div>
      </div>
      <div className="flex justify-between text-grey-placeholder">
        <span>Maximum : {MAX_CHARACTERS} caractères</span>
        <span>{editorState.getCurrentContent().getPlainText('').length} / {MAX_CHARACTERS}</span>
      </div>
    </>
  );
};

export default RichTextEditor;
