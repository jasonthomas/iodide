import { languageDefinitions } from "./language-definitions";

export const NONCODE_EVAL_TYPES = ["css", "md", "meta", "raw"];

const appMessageSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
    details: { type: "string" },
    when: { type: "string" },
    id: { type: "integer", minimum: 0 }
  },
  additionalProperties: false
};

export const historySchema = {
  type: "object",
  properties: {
    cellId: { type: ["integer", "null"] },
    content: { type: "string" },
    historyId: { type: "string" },
    historyType: {
      type: "string",
      enum: [
        "APP_MESSAGE",
        "FETCH_CELL_INFO",
        "CONSOLE_INPUT",
        "CONSOLE_OUTPUT",
        "CONSOLE_MESSAGE"
      ]
    },
    lastRan: { type: "integer" },
    level: { type: "string", enum: ["INFO", "LOG", "WARN", "ERROR"] },
    language: { type: "string" },
    value: {}
  },
  additionalProperties: false
};

export const languageSchema = {
  type: "object",
  properties: {
    pluginType: { type: "string", enum: ["language"] },
    languageId: { type: "string" },
    displayName: { type: "string" },
    codeMirrorMode: { type: "string" },
    codeMirrorModeLoaded: { type: "boolean" },
    keybinding: { type: "string" },
    module: { type: "string" },
    evaluator: { type: "string" },
    asyncEvaluator: { type: "string" },
    url: { type: "string" }
  },
  additionalProperties: false
};

const environmentVariableSchema = {
  type: "array",
  items: [
    { type: "string", enum: ["object", "string", "rawString"] },
    { type: "string" }
  ]
};

const panePositionSchema = {
  type: "object",
  properties: {
    display: { type: "string", enum: ["none", "block"], default: "none" },
    top: { type: "number", default: 0 },
    left: { type: "number", default: 0 },
    width: { type: "number", default: 0 },
    height: { type: "number", default: 0 }
  },
  additionalProperties: false
};

const positionerDefaults = {
  display: "none",
  top: 0,
  left: 0,
  width: 0,
  height: 0
};

export const stateProperties = {
  appMessages: {
    type: "array",
    items: appMessageSchema,
    default: []
  },
  consoleText: {
    type: "string",
    default: ""
  },
  consoleTextCache: {
    // stores the current entry when keying up/down
    type: "string",
    default: ""
  },
  consoleScrollbackPosition: {
    // the position from the END of the history when keying up/down in the console
    type: "integer",
    default: 0
  },
  evalFrameMessageQueue: {
    type: "array",
    items: { type: "object" },
    default: []
  },
  evalFrameReady: {
    type: "boolean",
    default: false
  },
  gettingRevisionList: {
    type: "boolean",
    default: false
  },
  hasPreviousAutoSave: {
    type: "boolean",
    default: false
  },
  history: {
    type: "array",
    items: historySchema,
    default: []
  },
  jsmd: {
    type: "string",
    default: ""
  },
  previouslySavedContent: {
    type: "object",
    default: { title: "", jsmd: "" },
    properties: {
      title: { type: "string" },
      jsmd: { type: "string" }
    }
  },
  jsmdChunks: {
    type: "array",
    items: {
      type: "object",
      properties: {
        chunkContent: { type: "string" },
        chunkType: { type: "string" },
        chunkId: { type: "string" },
        evalFlags: {
          type: "array",
          items: { type: "string" }
        },
        startLine: { type: "integer" },
        endLine: { type: "integer" }
      },
      additionalProperties: false,
      default: {}
    },
    default: []
  },
  languageDefinitions: {
    type: "object",
    additionalProperties: languageSchema,
    default: languageDefinitions
  },
  languageLastUsed: {
    type: "string",
    default: "js"
  },
  lastExport: {
    type: "string",
    default: undefined
  },
  lastSaved: {
    type: "string",
    default: undefined
  },
  loadedLanguages: {
    type: "object",
    additionalProperties: languageSchema,
    default: { js: languageDefinitions.js }
  },
  modalState: {
    type: "string",
    enum: ["HELP_MODAL", "HISTORY_MODAL", "MODALS_CLOSED"],
    default: "MODALS_CLOSED"
  },
  kernelState: {
    type: "string",
    enum: [
      "KERNEL_LOADING",
      "KERNEL_LOAD_ERROR",
      "KERNEL_ERROR",
      "KERNEL_IDLE",
      "KERNEL_BUSY"
    ],
    default: "KERNEL_IDLE"
  },
  notebookHistory: {
    type: "object",
    properties: {
      revisionContentFetchStatus: {
        type: "string",
        enum: ["FETCHING", "ERROR", "IDLE"],
        default: "IDLE"
      },
      revisionListFetchStatus: {
        type: "string",
        enum: ["FETCHING", "ERROR", "IDLE"],
        default: "IDLE"
      },
      revisionList: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            created: { type: "string" }
          }
        },
        default: []
      },
      selectedRevision: {
        type: "number"
      },
      revisionContent: {
        type: "object",
        additionalProperties: { type: "string" },
        default: {}
      }
    }
  },
  notebookInfo: {
    type: "object",
    properties: {
      user_can_save: { type: "boolean" },
      notebook_id: { type: "integer" },
      connectionStatus: {
        type: "string",
        enum: ["CONNECTION_ACTIVE", "CONNECTION_LOST"]
      },
      connectionMode: {
        type: "string",
        enum: ["SERVER", "STANDALONE"]
      },
      tryItMode: { type: "boolean" }
    },
    default: {
      notebook_id: undefined,
      user_can_save: false,
      connectionMode: "STANDALONE",
      connectionStatus: "CONNECTION_ACTIVE"
    }
  },
  panePositions: {
    type: "object",
    additionalProperties: panePositionSchema,
    default: {
      EditorPositioner: Object.assign({}, positionerDefaults),
      ReportPositioner: Object.assign({}, positionerDefaults),
      ConsolePositioner: Object.assign({}, positionerDefaults),
      WorkspacePositioner: Object.assign({}, positionerDefaults)
    }
  },
  savedEnvironment: {
    type: "object",
    additionalProperties: environmentVariableSchema,
    default: {}
  },
  title: {
    type: "string",
    default: "untitled"
  },
  userData: {
    type: "object",
    properties: {
      name: { type: "string" },
      avatar: { type: "string" }
    },
    additionalProperties: false,
    default: {}
  },
  userDefinedVarNames: {
    type: "array",
    items: { type: "string" },
    default: []
  },
  viewMode: {
    type: "string",
    enum: ["EXPLORE_VIEW", "REPORT_VIEW"],
    default: "EXPLORE_VIEW"
  },
  wrapEditors: {
    type: "boolean",
    default: true
  }
};

export const stateSchema = {
  type: "object",
  properties: stateProperties,
  additionalProperties: false
};
