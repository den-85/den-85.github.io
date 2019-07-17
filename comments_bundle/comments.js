class Repository{static fetch(url){return fetch(url).then((response)=>response.json())}
static update(url,payload){return fetch(url,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),})}}
class Component{constructor({element}){this.$element=element}
on(eventName,handler){this.$element.addEventListener(eventName,handler)}
_trigger(eventName,detail){const event=new CustomEvent(eventName,{detail})
this.$element.dispatchEvent(event)}}
const commentTemplate=`
                    <div class="card mb-1" data-key="{{id}}">
                        <div class="row no-gutters">
                            <div class="col-md-1">
                                <img src="avatar.jpg" class="mt-3 ml-3" alt="user-avatar">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <p class="alert-link">{{name}}</p>
                                    <p class="card-text">{{text}}</p>
                                    <p class="card-text"><small class="text-muted">Added on {{time}}</small></p>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-link" id="rpl{{id}}">reply</button>
                                 <button type="button" class="btn btn-link" id="del{{id}}">delete</button>
                            </div>
                        </div>
                        <div data-child="{{id}}" class="ml-1 mr-1">
                        </div>
                    </div>
`
class List extends Component{constructor(options){super(options)
this.$element.addEventListener('click',this._removeClickHandler.bind(this))
this.$element.addEventListener('click',List._replyClickHandler.bind(this))}
add(comments){this._render(comments)}
addSingle(comment){this._renderSingle(comment)}
_remove(id){this._trigger('CommentRemoved',id)
document.getElementById('comment-no').innerHTML=String(Number(document.getElementById('comment-no').innerHTML)-1)
const childToRemove=this.$element.querySelector(`[data-key="${id}"]`)
childToRemove.parentNode.removeChild(childToRemove)}
_removeClickHandler(event){if(!event.target.id.includes('del')){return}
const elementToDelete=this.$element.querySelector(`[data-key="${event.target.id.replace('del','')}"]`)
this._remove(parseInt(elementToDelete.dataset.key))}
static _replyClickHandler(event){if(!event.target.id.includes('rpl')){return}
document.getElementById('reply-to').value=event.target.id.replace('rpl','')
document.getElementById('comment').focus()}
_render(comments){document.getElementById('comment-no').innerHTML=String(Object.keys(comments).length)
this._prepareCommentSection(Object.keys(comments).length)
for(let key in comments){this._insertComment(comments[key].parent,Mustache.render(commentTemplate,comments[key]))}}
_renderSingle(comment){document.getElementById('comment-no').innerHTML=Number(document.getElementById('comment-no').innerHTML)+1
this._insertComment(comment.parent,Mustache.render(commentTemplate,comment))}
_prepareCommentSection(elements){if(elements){this.$element.innerHTML=''
this.$element.classList.remove('alert')
this.$element.classList.remove('alert-danger')}else{this.$element.classList.add('alert')
this.$element.classList.add('alert-danger')}}
_insertComment(key,commentElement){let elem=this.$element.querySelector(`[data-child="${key}"]`)
if(elem){elem.insertAdjacentHTML('beforeend',commentElement)}else{this.$element.insertAdjacentHTML('beforeend',commentElement)}}}
class Form extends Component{constructor(options){super(options)
this.$element.addEventListener('submit',this._submitHandler.bind(this))}
_submitHandler(event){event.preventDefault()
this._trigger('CommentSubmitted',this.$element.comment.value)
this.$element.reset()}}
const apiUrl='https://api.myjson.com/bins/cjgc9'
class App{constructor({element}){this.$element=element
this._comments=[]
this._form=new Form({element:this.$element.querySelector('[data-component="form"]')})
this._list=new List({element:this.$element.querySelector('[data-component="comment-list"]')})
this._form.on('CommentSubmitted',this._onCommentSubmit.bind(this))
this._list.on('CommentRemoved',this._onCommentRemoved.bind(this))
this._init()}
_init(){this._fetchComments()}
_onCommentSubmit(event){if(!event.detail){alert('Please enter some text to post')
return}
let currentDate=new Date()
let datetime=currentDate.toDateString()+' @ '+currentDate.toTimeString()
let replyTo=this.$element.querySelector('[data-selector="reply-to"]')
let name=this.$element.querySelector('[data-selector="name"]')
const comment={name:name.value||'Anonymous',text:event.detail,id:this._generateID(),time:datetime,parent:Number(replyTo.value||-1),}
this._list.addSingle(comment)
this._comments.push(comment)
this._updateComments()}
_onCommentRemoved({detail:id}){this._deleteHierarchy(id)
this._updateComments()}
_deleteHierarchy(id){this._comments=this._comments.filter(comment=>comment.id!==id)
for(let key in this._comments){if(this._comments[key]){if(this._comments[key].parent===id){this._deleteHierarchy(this._comments[key].id)}}}}
_generateID(){const ids=this._comments.map(comment=>comment.id)
return ids.length?Math.max(...ids)+1:0}
_fetchComments(){Repository.fetch(apiUrl).then(data=>{this._comments=data.comments
this._list.add(data.comments)})}
_updateComments(){Repository.update(apiUrl,{'comments':this._comments}).then(()=>console.log('saved successfully')).catch((err)=>console.error(err))}}
const app=new App({element:document.querySelector('[data-component="app"]')})