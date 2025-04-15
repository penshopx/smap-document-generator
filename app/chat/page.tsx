"use client"

import type React from "react"

import { useState } from "react"
import { Send, Bot, User, Paperclip, Mic, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Mock data for chat conversations
const initialConversations = [
  {
    id: "ai-assistant",
    name: "AI Asisten",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "ai",
    messages: [
      {
        id: "1",
        sender: "ai",
        content: "Halo! Saya adalah asisten pembelajaran Anda. Ada yang bisa saya bantu terkait kursus Anda?",
        timestamp: "10:30",
      },
      {
        id: "2",
        sender: "user",
        content: "Saya memiliki pertanyaan tentang rangkaian listrik paralel.",
        timestamp: "10:31",
      },
      {
        id: "3",
        sender: "ai",
        content:
          "Tentu, saya bisa membantu Anda dengan rangkaian listrik paralel. Dalam rangkaian paralel, komponen-komponen terhubung di antara dua titik yang sama, sehingga arus listrik memiliki beberapa jalur untuk mengalir. Beberapa karakteristik penting rangkaian paralel:\n\n1. Tegangan di setiap komponen sama\n2. Arus total adalah jumlah dari arus di setiap cabang\n3. Resistansi total lebih kecil dari resistansi terkecil dalam rangkaian\n\nAda hal spesifik tentang rangkaian paralel yang ingin Anda ketahui?",
        timestamp: "10:32",
      },
    ],
    lastMessage: "Tentu, saya bisa membantu Anda dengan rangkaian listrik paralel...",
    lastMessageTime: "10:32",
    unread: 0,
  },
  {
    id: "instructor-budi",
    name: "Dr. Budi Santoso",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "instructor",
    messages: [
      {
        id: "1",
        sender: "instructor",
        content: "Halo, bagaimana perkembangan tugas Anda tentang kelistrikan dasar?",
        timestamp: "Kemarin",
      },
      {
        id: "2",
        sender: "user",
        content: "Saya sudah menyelesaikan bagian pertama, tapi masih bingung dengan konsep induktansi.",
        timestamp: "Kemarin",
      },
      {
        id: "3",
        sender: "instructor",
        content:
          "Induktansi memang konsep yang cukup kompleks. Mari kita bahas di sesi konsultasi besok. Saya akan menyiapkan beberapa contoh untuk membantu pemahaman Anda.",
        timestamp: "Kemarin",
      },
    ],
    lastMessage: "Induktansi memang konsep yang cukup kompleks. Mari kita bahas di sesi konsultasi besok...",
    lastMessageTime: "Kemarin",
    unread: 1,
  },
  {
    id: "group-kelistrikan",
    name: "Grup Kelistrikan Dasar",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "group",
    messages: [
      {
        id: "1",
        sender: "Rina Wijaya",
        content: "Apakah ada yang sudah mengerjakan latihan bab 3?",
        timestamp: "09:15",
      },
      {
        id: "2",
        sender: "Hadi Prasetyo",
        content: "Saya sudah, tapi masih bingung dengan soal nomor 5.",
        timestamp: "09:20",
      },
      {
        id: "3",
        sender: "user",
        content: "Saya juga mengalami kesulitan dengan soal itu. Mungkin kita bisa diskusikan bersama?",
        timestamp: "09:25",
      },
    ],
    lastMessage: "Saya juga mengalami kesulitan dengan soal itu. Mungkin kita bisa diskusikan bersama?",
    lastMessageTime: "09:25",
    unread: 3,
  },
]

type Sender = "user" | "ai" | "instructor" | string

interface Message {
  id: string
  sender: Sender
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  type: "ai" | "instructor" | "group"
  messages: Message[]
  lastMessage: string
  lastMessageTime: string
  unread: number
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConversation, setActiveConversation] = useState<string>("ai-assistant")
  const [newMessage, setNewMessage] = useState<string>("")

  const currentConversation = conversations.find((conv) => conv.id === activeConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation) {
        const newMsg: Message = {
          id: Date.now().toString(),
          sender: "user",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setNewMessage("")

    // Simulate response for AI assistant
    if (activeConversation === "ai-assistant") {
      setTimeout(() => {
        const updatedConversationsWithReply = conversations.map((conv) => {
          if (conv.id === "ai-assistant") {
            const aiReply: Message = {
              id: Date.now().toString(),
              sender: "ai",
              content: "Saya sedang memproses pertanyaan Anda. Mohon tunggu sebentar...",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }

            return {
              ...conv,
              messages: [...conv.messages, { ...aiReply, id: Date.now().toString() }],
              lastMessage: aiReply.content,
              lastMessageTime: aiReply.timestamp,
            }
          }
          return conv
        })

        setConversations(updatedConversationsWithReply)
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessageContent = (content: string) => {
    // Split content by newlines and render paragraphs
    return content.split("\n").map((paragraph, index) => (
      <p key={index} className={index > 0 ? "mt-2" : ""}>
        {paragraph}
      </p>
    ))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Percakapan</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <div className="px-4">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all" className="flex-1">
                    Semua
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex-1">
                    AI
                  </TabsTrigger>
                  <TabsTrigger value="instructors" className="flex-1">
                    Instruktur
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {conversations.map((conversation) => (
                    <div key={conversation.id}>
                      <button
                        className={`w-full flex items-start gap-3 p-4 hover:bg-muted/50 text-left ${
                          activeConversation === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveConversation(conversation.id)}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                          <AvatarFallback>
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{conversation.name}</p>
                            <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </button>
                      <Separator />
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="ai" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {conversations
                    .filter((conv) => conv.type === "ai")
                    .map((conversation) => (
                      <div key={conversation.id}>
                        <button
                          className={`w-full flex items-start gap-3 p-4 hover:bg-muted/50 text-left ${
                            activeConversation === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setActiveConversation(conversation.id)}
                        >
                          <Avatar>
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <p className="font-medium truncate">{conversation.name}</p>
                              <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </button>
                        <Separator />
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="instructors" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {conversations
                    .filter((conv) => conv.type === "instructor" || conv.type === "group")
                    .map((conversation) => (
                      <div key={conversation.id}>
                        <button
                          className={`w-full flex items-start gap-3 p-4 hover:bg-muted/50 text-left ${
                            activeConversation === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setActiveConversation(conversation.id)}
                        >
                          <Avatar>
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>
                              {conversation.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <p className="font-medium truncate">{conversation.name}</p>
                              <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </button>
                        <Separator />
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 flex flex-col">
          {currentConversation ? (
            <>
              <CardHeader className="border-b px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={currentConversation.avatar || "/placeholder.svg"}
                      alt={currentConversation.name}
                    />
                    <AvatarFallback>
                      {currentConversation.type === "ai" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        currentConversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{currentConversation.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.type === "ai"
                        ? "AI Asisten"
                        : currentConversation.type === "instructor"
                          ? "Instruktur"
                          : "Grup Diskusi"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4 h-[calc(100vh-300px)]">
                  <div className="space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            {message.sender === "user" ? (
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            ) : message.sender === "ai" ? (
                              <AvatarFallback>
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback>
                                {message.sender
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            {message.sender !== "user" && message.sender !== "ai" && (
                              <p className="text-xs font-medium mb-1">{message.sender}</p>
                            )}
                            <div className="text-sm">{renderMessageContent(message.content)}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" type="button">
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Lampirkan file</span>
                    </Button>
                    <Button variant="outline" size="icon" type="button">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Lampirkan gambar</span>
                    </Button>
                    <Button variant="outline" size="icon" type="button">
                      <Mic className="h-4 w-4" />
                      <span className="sr-only">Rekam audio</span>
                    </Button>
                    <div className="relative flex-1">
                      <Input
                        placeholder="Ketik pesan..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pr-10"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Kirim</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <Bot className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Mulai Percakapan</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Pilih percakapan dari daftar atau mulai percakapan baru dengan AI Asisten untuk mendapatkan bantuan
                dengan kursus Anda.
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
