import { User } from "./types/user";
import { Workspace } from "./types/workspace";
import { WorkspaceMembership } from "./types/workspace-membership";
import { Contact } from "./types/contact";
import { Campaign } from "./types/campaign";
import { MessageTemplate } from "./types/template";
import { CampaignMessage } from "./types/campaign-message";
import { canEditCampaign, canLaunchCampaign, getCampaignStatusMessage, filterCampaigns} from "./utils/campaign-utils";

const user: User = {
    id: "user001",
    name: "Aarti Shah",
    email: "aarti@gmail.com",
    passwordHash: "example-hash",
    createdAt: new Date(),
    updatedAt: new Date()
};

const workspace: Workspace = {
    id: "ws001",
    name: "ABC Technologies",
    description: "Workspace for the ABC marketing team",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()

};

const membership: WorkspaceMembership = {
    id: "membership001",
    userId: user.id,
    workspaceId: workspace.id,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()

};

const contact: Contact = {
    id: "contact001",
    workspaceId: workspace.id,
    name: "Sakshi Mehta",
    email: "sakshi89@yahoo.com",
    phone: "9876543210",
    tags: ["Customer, Premium"],
    createdAt: new Date(),
    updatedAt: new Date()

};
const newContact: Contact = {
  id: "contact-101",
  workspaceId: "workspace-1",
  name: "Rahul",
  email: "rahul@example.com",
  phone: "78654321098",
  createdAt: new Date(),
  updatedAt: new Date()
};

const template: MessageTemplate = {
    id: "template001",
    workspaceId: workspace.id,
    name: "Welcome Message",
    type: "text",
    text: "Welcome to out newsletter",
    createdBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()

};

const campaign: Campaign = {
    id: "campaign001",
    workspaceId: workspace.id,
    name:"October Welcome Campaign",
    templateId: template.id,
    contactIds: [contact.id],
    status: "draft",
    createdBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()

};

const campaignMessage: CampaignMessage = {
    id: "message001",
    campaignId: campaign.id,
    workspaceId: workspace.id,
    contactId: contact.id,
    recipientName: contact.name,
    recipientEmail: contact.email,
    templateType: template.type,
    messageText: template.text,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()

}

console.log("User: ",user);
console.log("Workspace Details: ",workspace);
console.log("Membership: ",membership);
console.log("Contact: ",contact);
console.log("Message Template: ",template);
console.log("Campaign: ",campaign);
console.log("Campaign Message: ",campaignMessage);
console.log("Can edit:",canEditCampaign(campaign));
console.log("Can launch:",canLaunchCampaign(campaign));
console.log("Status message:",getCampaignStatusMessage(campaign));
console.log("Draft campaigns:",filterCampaigns([campaign], "draft"));
console.log("All campaigns:",filterCampaigns([campaign]));
console.log("Contact name:", newContact.name);
console.log("Contact phone:", newContact.phone);
console.log("Contact ID:", newContact.id);
newContact.id = "contact-102";
