import React, { Component } from "react";
import {
  Header,
  Heading,
  Split,
  Box,
  Paragraph,
  Button,
  Select,
  Section,
  Article,
  Headline,
  Form,
  FormField,
  TextInput
} from "grommet";
import Toast from "grommet/components/Toast";
import { Redirect } from "react-router-dom";
import FormPreviousIcon from "grommet/components/icons/base/FormPrevious";
import RevertIcon from "grommet/components/icons/base/Revert";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import EmailEditor from "react-email-editor";
import test from "./test.json";
import test2 from "./test2.json";
import custom from "./custom.json";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import axios from "axios";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendgridEmails: [],
      themes: [
        { themeName: "custom" },
        { themeName: "Summer Events" },
        { themeName: "HackReactor" }
      ],
      popup: false,
      sendPopup: false
    };
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      contactInfo: [
        ...this.state.contactInfo,
        { name: this.state.nameInput, email: this.state.emailInput }
      ],
      sendgridEmails: [...this.state.sendgridEmails, this.state.emailInput],
      emailInput: "",
      nameInput: ""
    });
    axios.post("/saveContactEmail", this.state.contactInfo);
    console.log(this.state.item, "in onClick");
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.popup === true ? (
          <Toast
            status="ok"
            onClose={() => {
              this.setState({ popup: false });
            }}
          >
            Template Saved!
          </Toast>
        ) : (
          <p />
        )}
        {this.state.sendPopup === true ? (
          <Toast
            status="ok"
            onClose={() => {
              this.setState({ sendPopup: false });
            }}
          >
            Emails Sent!
          </Toast>
        ) : (
          <p />
        )}
        <Select
          style={{ width: "37%", float: "right" }}
          placeHolder="Select Theme"
          inline={false}
          multiple={false}
          onSearch={false}
          options={this.state.themes.map(function(info, key) {
            return {
              value: info.themeName,
              sub: info,
              label: (
                <Box direction="row" justify="center">
                  <span>{info.themeName}</span>
                </Box>
              )
            };
          })}
          value={undefined}
          onChange={e => {
            if (e.option.value === "Summer Events") {
              return this.editor.loadDesign(test);
            } else if (e.option.value === "HackReactor") {
              return this.editor.loadDesign(test2);
            } else {
              this.editor.loadDesign(`{
  "body": {
    "rows": [
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "image",
                "values": {
                  "maxWidth": "100%",
                  "src": {
                    "url":
                      "https://a.mailmunch.co/user_data/landing_pages/1500310730675-logosample_03.png",
                    "width": 266,
                    "height": 62
                  },
                  "draggable": true,
                  "containerPadding": "10px 10px 20px",
                  "deletable": true,
                  "selectable": true,
                  "action": {
                    "url": "",
                    "target": ""
                  },
                  "altText": "Image",
                  "fullWidth": false,
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 10px 5px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#000",
                  "textAlign": "center",
                  "lineHeight": "120%",
                  "text":
                    "<div><span style=\"color: #f10693; font-family: Pacifico, cursive; font-size: 14px; line-height: 16.8px;\"><strong><span style=\"font-size: 80px; line-height: 96px;\">Relax &amp; Plan</span></strong></span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#000",
                  "textAlign": "center",
                  "lineHeight": "120%",
                  "text":
                    "<div><span style=\"color: #6fbb7b; font-family: Pacifico, cursive; font-size: 58px; text-align: center; line-height: 69.6px;\">&nbsp;Your Summer Break</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "20px 10px 9px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#000",
                  "textAlign": "center",
                  "lineHeight": "140%",
                  "text":
                    "<div><span style=\"font-size: 24px; color: #505050; line-height: 33.6px;\">Time to plan a vacation for your kids?</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "5px 10px 10px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#000",
                  "textAlign": "center",
                  "lineHeight": "160%",
                  "text":
                    "<div><span style=\"font-size: 18px; line-height: 28.8px;\"><span style=\"color: #505050; font-size: 18px; line-height: 28.8px;\">Check-out our summer break offers for&nbsp;</span><span style=\"color: #505050; font-size: 18px; line-height: 28.8px;\">children who are creative, full of energy,&nbsp;</span><span style=\"color: #505050; font-size: 18px; line-height: 28.8px;\">and can&rsquo;t sit still for a minute.</span></span></div>"
                }
              },
              {
                "type": "divider",
                "values": {
                  "containerPadding": "20px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "width": "100%",
                  "border": {
                    "borderTopWidth": "1px",
                    "borderTopStyle": "solid",
                    "borderTopColor": "#CCC"
                  },
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "20px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#000",
                  "textAlign": "left",
                  "lineHeight": "120%",
                  "text":
                    "<div><strong><span style=\"font-size: 30px; font-family: Montserrat, sans-serif; color: #2790d2; line-height: 36px;\">Upcoming Events:</span></strong></div>"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "0px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1, 2],
        "columns": [
          {
            "contents": [
              {
                "type": "image",
                "values": {
                  "maxWidth": "100%",
                  "src": {
                    "url":
                      "https://a.mailmunch.co/user_data/landing_pages/1500313461528-1.png",
                    "width": 500,
                    "height": 500
                  },
                  "draggable": true,
                  "containerPadding": "0px",
                  "deletable": true,
                  "selectable": true,
                  "action": {
                    "url": "",
                    "target": ""
                  },
                  "altText": "Image",
                  "fullWidth": true,
                  "textAlign": "center"
                }
              }
            ]
          },
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px 8px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#6eba79",
                  "textAlign": "left",
                  "lineHeight": "160%",
                  "text":
                    "<div><span style=\"font-size: 20px; line-height: 32px;\">JET SKI RIDE</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#4f4f4f",
                  "textAlign": "left",
                  "lineHeight": "150%",
                  "text":
                    "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>"
                }
              },
              {
                "type": "button",
                "values": {
                  "buttonColors": {
                    "color": "#FFF",
                    "backgroundColor": "#fa9302",
                    "hoverColor": "#cf7a04"
                  },
                  "calculatedHeight": 36,
                  "calculatedWidth": 132,
                  "href": "",
                  "border": {},
                  "text": "ORDER NOW<br />",
                  "draggable": true,
                  "containerPadding": "5px 15px",
                  "padding": "10px 20px",
                  "deletable": true,
                  "selectable": true,
                  "textAlign": "left",
                  "lineHeight": "120%",
                  "borderRadius": "20px"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "divider",
                "values": {
                  "containerPadding": "1px 20px 5px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "width": "100%",
                  "border": {
                    "borderTopWidth": "1px",
                    "borderTopStyle": "solid",
                    "borderTopColor": "#CCC"
                  },
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "0px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [2, 1],
        "columns": [
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px 8px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#6eba79",
                  "textAlign": "left",
                  "lineHeight": "160%",
                  "text":
                    "<div><span style=\"font-size: 20px; line-height: 32px;\">BOAT RIDE</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#4f4f4f",
                  "textAlign": "left",
                  "lineHeight": "150%",
                  "text":
                    "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>"
                }
              },
              {
                "type": "button",
                "values": {
                  "buttonColors": {
                    "color": "#FFF",
                    "backgroundColor": "#fa9302",
                    "hoverColor": "#cf7a04"
                  },
                  "calculatedHeight": 36,
                  "calculatedWidth": 132,
                  "href": "",
                  "border": {},
                  "text": "ORDER NOW<br />",
                  "draggable": true,
                  "containerPadding": "5px 15px",
                  "padding": "10px 20px",
                  "deletable": true,
                  "selectable": true,
                  "textAlign": "left",
                  "lineHeight": "120%",
                  "borderRadius": "20px"
                }
              }
            ]
          },
          {
            "contents": [
              {
                "type": "image",
                "values": {
                  "maxWidth": "100%",
                  "src": {
                    "url":
                      "https://a.mailmunch.co/user_data/landing_pages/1500313783372-2.png",
                    "width": 500,
                    "height": 500
                  },
                  "draggable": true,
                  "containerPadding": "0px",
                  "deletable": true,
                  "selectable": true,
                  "action": {
                    "url": "",
                    "target": ""
                  },
                  "altText": "Image",
                  "fullWidth": true,
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "divider",
                "values": {
                  "containerPadding": "1px 20px 5px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "width": "100%",
                  "border": {
                    "borderTopWidth": "1px",
                    "borderTopStyle": "solid",
                    "borderTopColor": "#CCC"
                  },
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "0px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1, 2],
        "columns": [
          {
            "contents": [
              {
                "type": "image",
                "values": {
                  "maxWidth": "100%",
                  "src": {
                    "url":
                      "https://a.mailmunch.co/user_data/landing_pages/1500314095876-3.png",
                    "width": 500,
                    "height": 500
                  },
                  "draggable": true,
                  "containerPadding": "0px",
                  "deletable": true,
                  "selectable": true,
                  "action": {
                    "url": "",
                    "target": ""
                  },
                  "altText": "Image",
                  "fullWidth": true,
                  "textAlign": "center"
                }
              }
            ]
          },
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px 8px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#6eba79",
                  "textAlign": "left",
                  "lineHeight": "160%",
                  "text":
                    "<div><span style=\"font-size: 20px; line-height: 32px;\">BEACH DAY</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px 15px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#4f4f4f",
                  "textAlign": "left",
                  "lineHeight": "150%",
                  "text":
                    "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>"
                }
              },
              {
                "type": "button",
                "values": {
                  "buttonColors": {
                    "color": "#FFF",
                    "backgroundColor": "#fa9302",
                    "hoverColor": "#cf7a04"
                  },
                  "calculatedHeight": 36,
                  "calculatedWidth": 132,
                  "href": "",
                  "border": {},
                  "text": "ORDER NOW<br />",
                  "draggable": true,
                  "containerPadding": "5px 15px",
                  "padding": "10px 20px",
                  "deletable": true,
                  "selectable": true,
                  "textAlign": "left",
                  "lineHeight": "120%",
                  "borderRadius": "20px"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "divider",
                "values": {
                  "containerPadding": "1px 20px 5px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "width": "100%",
                  "border": {
                    "borderTopWidth": "1px",
                    "borderTopStyle": "solid",
                    "borderTopColor": "#CCC"
                  },
                  "textAlign": "center"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "0px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "15px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#fa9302",
                  "textAlign": "center",
                  "lineHeight": "130%",
                  "text":
                    "<div><span style=\"font-size: 36px; line-height: 46.8px;\">NEED MORE INFORMATION?</span></div>"
                }
              },
              {
                "type": "text",
                "values": {
                  "containerPadding": "10px",
                  "selectable": true,
                  "draggable": true,
                  "deletable": true,
                  "color": "#4f4f4f",
                  "textAlign": "center",
                  "lineHeight": "120%",
                  "text":
                    "<div><span style=\"font-size: 20px; line-height: 24px;\">Subscribe to get updates.</span></div>"
                }
              },
              {
                "type": "button",
                "values": {
                  "buttonColors": {
                    "color": "#FFF",
                    "backgroundColor": "#6eba79",
                    "hoverColor": "#58a864"
                  },
                  "calculatedHeight": 52,
                  "calculatedWidth": 214,
                  "href": "",
                  "border": {},
                  "text":
                    "<span style=\"font-size: 20px; line-height: 32px;\">SUBSCRIBE NOW</span>",
                  "draggable": true,
                  "containerPadding": "20px",
                  "padding": "10px 20px",
                  "deletable": true,
                  "selectable": true,
                  "textAlign": "center",
                  "lineHeight": "160%",
                  "borderRadius": "37px"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "rgba(255,255,255,0)",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "10px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": true,
          "draggable": true,
          "deletable": true
        }
      },
      {
        "cells": [1],
        "columns": [
          {
            "contents": [
              {
                "type": "text",
                "values": {
                  "containerPadding": "20px",
                  "selectable": false,
                  "draggable": false,
                  "deletable": false,
                  "color": "#000",
                  "textAlign": "left",
                  "lineHeight": "120%",
                  "text":
                    "<div style=\"font-family: arial, helvetica, sans-serif;\"><span style=\"font-size: 12px; color: #999999; line-height: 14.4px;\">You received this email because you signed up for [[business_name]].</span></div>\n<div style=\"font-family: arial, helvetica, sans-serif;\">&nbsp;</div>\n<div style=\"font-family: arial, helvetica, sans-serif;\"><span style=\"font-size: 12px; color: #999999; line-height: 14.4px;\">[[{unsubscribe}]]</span></div>"
                }
              }
            ]
          }
        ],
        "values": {
          "backgroundColor": "#f0f0f0",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": false,
            "center": false,
            "cover": false
          },
          "padding": "30px",
          "columnsBackgroundColor": "rgba(255,255,255,0)",
          "selectable": false,
          "draggable": false,
          "deletable": false
        }
      }
    ],
    "values": {
      "backgroundColor": "#ffffff",
      "backgroundImage": {
        "url": "",
        "fullWidth": true,
        "repeat": false,
        "center": true,
        "cover": false
      },
      "contentWidth": "600px",
      "fontFamily": {
        "label": "Montserrat",
        "value": "Montserrat,sans-serif",
        "type": "google",
        "weights": "400,700"
      }
    }
  }
}`);
            }
          }}
        />
        <div>
          <EmailEditor
            style={{
              height: "870px",
              width: "1400px",
              borderStyle: "solid",
              borderRadius: "1%"
            }}
            ref={editor => (this.editor = editor)}
            onLoad={this.onLoad}
            onDesignLoad={this.onDesignLoad}
          />
        </div>
        <Button
          style={{
            position: "relative",
            float: "right",
            marginLeft: "10px",
            marginTop: "5px",
            marginRight: "10px"
          }}
          label="Send Email"
          type="submit"
          primary={true}
          onClick={this.exportHtml}
        />
        <Button
          style={{
            position: "relative",
            float: "right",
            marginLeft: "10px",
            marginTop: "5px"
          }}
          label="Save Template"
          type="submit"
          primary={true}
          onClick={this.saveDesign}
        />
      </div>
    );
  }
  exportHtml = () => {
    this.setState({ sendPopup: true });
    this.editor.exportHtml(data => {
      const { design, html } = data;
      // console.log("exportHtml", html);
      var a = html;
      var result = a
        .replace(/>\s+|\s+</g, function(m) {
          return m.trim();
        })
        .replace(/(\r\n|\n|\r)/gm, " ");
      console.log(result);
      //minify, escape double quotes, and remove line breaks
      // var b = a.replace(/\s{2,}/g, '').replace(/\'/g, '"').replace(/(\r\n|\n|\r)/gm,"")
      // var escaper = b.replace(/\"/g,"\\\"");
      // console.log(escaper)

      axios.post("/exportHTML", {
        data: a,
        sendgridEmails: this.state.sendgridEmails
      });
    });
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log("saveDesign", design);
      this.setState({ popup: true });
    });
  };

  onLoad = theme => {
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    return;
    this.editor.loadDesign();
  };

  // onDesignLoad = (data) => {
  //   console.log('onDesignLoad', data)
  // }
  // setTimeout(function(){this.onLoad()}, 3000)
}

function mapStateToProps(state) {
  return {
    user: state.user,
    contacts: state.contacts
  };
}

export default connect(mapStateToProps)(Editor);
