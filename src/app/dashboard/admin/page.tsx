'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, Trash2, Edit2, Upload, Eye, Check, AlertCircle, Loader2, RefreshCw, 
  Globe, Instagram, Users, Sparkles, FolderKanban, Image as ImageIcon, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
import InstagramMockup from '@/components/design-journey/InstagramMockup';

interface Work {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
}

interface Client {
  id: number;
  name: string;
  image: string;
  subscribers?: string;
  highlightSide?: 'left' | 'right';
}

export default function DashboardAdminPage() {
  const authToken = 'smartadverts123';
  const [activeTab, setActiveTab] = useState<'works' | 'clients' | 'instagram'>('works');

  // Instagram State
  const [instaUsername, setInstaUsername] = useState('smartadverts_');
  const [instaProfileImage, setInstaProfileImage] = useState('https://res.cloudinary.com/drfiuipgl/image/upload/v1781253018/instaprofile_pkmgp8.webp');
  const [instaPosts, setInstaPosts] = useState('445');
  const [instaFollowers, setInstaFollowers] = useState('4,665');
  const [instaFollowing, setInstaFollowing] = useState('27');
  const [instaFullName, setInstaFullName] = useState('SmartAdverts | Creative Partner');
  const [instaCategory, setInstaCategory] = useState('Marketing Agency');
  const [instaAdminText, setInstaAdminText] = useState('Admin @siddardha_chitturi');
  const [instaAdminLink, setInstaAdminLink] = useState('https://www.instagram.com/siddardha_chitturi/');
  const [instaBioLine1, setInstaBioLine1] = useState('🎯 Thumbnail editing');
  const [instaBioLine2, setInstaBioLine2] = useState('🎬 Video editing');
  const [instaBioLine3, setInstaBioLine3] = useState('⚡ We build brands.');
  const [instaWebsiteLabel, setInstaWebsiteLabel] = useState('smartadverts.in');
  const [instaWebsiteUrl, setInstaWebsiteUrl] = useState('https://smartadverts.in');
  const [isUploadingInstaImg, setIsUploadingInstaImg] = useState(false);
  const instaInputRef = useRef<HTMLInputElement>(null);

  // Works State
  const [works, setWorks] = useState<Work[]>([]);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workLabel, setWorkLabel] = useState('');
  const [workBeforeImage, setWorkBeforeImage] = useState('');
  const [workAfterImage, setWorkAfterImage] = useState('');
  const [workThumbnail, setWorkThumbnail] = useState('');
  const [isUploadingBefore, setIsUploadingBefore] = useState(false);
  const [isUploadingAfter, setIsUploadingAfter] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);

  // Clients State
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientImage, setClientImage] = useState('');
  const [clientSubscribers, setClientSubscribers] = useState('');
  const [clientHighlightSide, setClientHighlightSide] = useState<'left' | 'right' | ''>('');
  const [isUploadingClientImg, setIsUploadingClientImg] = useState(false);

  // Status State
  const [globalLoading, setGlobalLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const clientInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const fetchWorks = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const res = await fetch('/api/admin/works');
      if (res.ok) {
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const res = await fetch('/api/admin/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  const fetchInstagram = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const res = await fetch('/api/admin/instagram');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          if (data.username) setInstaUsername(data.username);
          if (data.profileImage) setInstaProfileImage(data.profileImage);
          if (data.posts) setInstaPosts(data.posts);
          if (data.followers) setInstaFollowers(data.followers);
          if (data.following) setInstaFollowing(data.following);
          if (data.fullName) setInstaFullName(data.fullName);
          if (data.category) setInstaCategory(data.category);
          if (data.adminText) setInstaAdminText(data.adminText);
          if (data.adminLink) setInstaAdminLink(data.adminLink);
          if (data.bioLine1) setInstaBioLine1(data.bioLine1);
          if (data.bioLine2) setInstaBioLine2(data.bioLine2);
          if (data.bioLine3) setInstaBioLine3(data.bioLine3);
          if (data.websiteLabel) setInstaWebsiteLabel(data.websiteLabel);
          if (data.websiteUrl) setInstaWebsiteUrl(data.websiteUrl);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorks();
    fetchClients();
    fetchInstagram();
  }, [fetchWorks, fetchClients, fetchInstagram]);

  const handleFileUpload = async (file: File, type: 'before' | 'after' | 'thumb' | 'client' | 'insta') => {
    if (type === 'before') setIsUploadingBefore(true);
    if (type === 'after') setIsUploadingAfter(true);
    if (type === 'thumb') setIsUploadingThumb(true);
    if (type === 'client') setIsUploadingClientImg(true);
    if (type === 'insta') setIsUploadingInstaImg(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        if (type === 'before') setWorkBeforeImage(data.url);
        if (type === 'after') setWorkAfterImage(data.url);
        if (type === 'thumb') setWorkThumbnail(data.url);
        if (type === 'client') setClientImage(data.url);
        if (type === 'insta') setInstaProfileImage(data.url);
        showNotification('success', 'Image uploaded successfully to Cloudinary!');
      } else {
        showNotification('error', data.error || 'Failed to upload image');
      }
    } catch {
      showNotification('error', 'Network error during upload');
    } finally {
      if (type === 'before') setIsUploadingBefore(false);
      if (type === 'after') setIsUploadingAfter(false);
      if (type === 'thumb') setIsUploadingThumb(false);
      if (type === 'client') setIsUploadingClientImg(false);
      if (type === 'insta') setIsUploadingInstaImg(false);
    }
  };

  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workLabel || !workBeforeImage || !workAfterImage) {
      showNotification('error', 'Please fill in all work fields.');
      return;
    }

    try {
      setGlobalLoading(true);
      const payload = {
        id: editingWork ? editingWork.id : undefined,
        label: workLabel,
        beforeImage: workBeforeImage,
        afterImage: workAfterImage,
        thumbnail: workThumbnail || workAfterImage,
      };

      const res = await fetch('/api/admin/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWorks(data.works);
        setEditingWork(null);
        setWorkLabel('');
        setWorkBeforeImage('');
        setWorkAfterImage('');
        setWorkThumbnail('');
        showNotification('success', editingWork ? 'Work updated!' : 'New work published!');
      } else {
        showNotification('error', data.error || 'Failed to save work');
      }
    } catch {
      showNotification('error', 'Network error while saving work');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleDeleteWork = async (id: number) => {
    if (!confirm('Are you sure you want to delete this work?')) return;
    try {
      setGlobalLoading(true);
      const res = await fetch(`/api/admin/works?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWorks(data.works);
        showNotification('success', 'Work deleted successfully!');
      } else {
        showNotification('error', data.error || 'Failed to delete work');
      }
    } catch {
      showNotification('error', 'Network error while deleting work');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientImage) {
      showNotification('error', 'Please provide client name and avatar.');
      return;
    }

    try {
      setGlobalLoading(true);
      const payload = {
        id: editingClient ? editingClient.id : undefined,
        name: clientName,
        image: clientImage,
        subscribers: clientSubscribers,
        highlightSide: clientHighlightSide || undefined,
      };

      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClients(data.clients);
        setEditingClient(null);
        setClientName('');
        setClientImage('');
        setClientSubscribers('');
        setClientHighlightSide('');
        showNotification('success', editingClient ? 'Client updated!' : 'New client added!');
      } else {
        showNotification('error', data.error || 'Failed to save client');
      }
    } catch {
      showNotification('error', 'Network error while saving client');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      setGlobalLoading(true);
      const res = await fetch(`/api/admin/clients?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setClients(data.clients);
        showNotification('success', 'Client deleted successfully!');
      } else {
        showNotification('error', data.error || 'Failed to delete client');
      }
    } catch {
      showNotification('error', 'Network error while deleting client');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleSaveInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setGlobalLoading(true);
      const res = await fetch('/api/admin/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          username: instaUsername,
          profileImage: instaProfileImage,
          posts: instaPosts,
          followers: instaFollowers,
          following: instaFollowing,
          fullName: instaFullName,
          category: instaCategory,
          adminText: instaAdminText,
          adminLink: instaAdminLink,
          bioLine1: instaBioLine1,
          bioLine2: instaBioLine2,
          bioLine3: instaBioLine3,
          websiteLabel: instaWebsiteLabel,
          websiteUrl: instaWebsiteUrl
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'Instagram showcase updated!');
      } else {
        showNotification('error', data.error || 'Failed to save Instagram data');
      }
    } catch {
      showNotification('error', 'Network error while updating Instagram stats');
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 dark:bg-black p-4 sm:p-6 lg:p-10 space-y-8 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
              Marketing CMS
            </span>
            <span className="text-xs font-bold text-slate-400">Live Website Sync</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Website Catalog Admin</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage public portfolio, creators, and Instagram showcase</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Globe size={15} />
            View Live Site
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {message && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
            : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
        }`}>
          {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('works')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'works'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
              : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-850 hover:text-slate-900'
          }`}
        >
          <FolderKanban size={15} />
          Showcase Works ({works.length})
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'clients'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
              : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-850 hover:text-slate-900'
          }`}
        >
          <Users size={15} />
          Creators & Clients ({clients.length})
        </button>
        <button
          onClick={() => setActiveTab('instagram')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'instagram'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
              : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-850 hover:text-slate-900'
          }`}
        >
          <Instagram size={15} />
          Instagram Live Mockup
        </button>
      </div>

      {/* Tab 1: Works */}
      {activeTab === 'works' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
            <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Plus size={18} className="text-indigo-600" />
              {editingWork ? 'Edit Work Item' : 'Add New Work'}
            </h2>

            <form onSubmit={handleSaveWork} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finance & Trading, Gaming, Vlogs"
                  value={workLabel}
                  onChange={(e) => setWorkLabel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-600"
                />
              </div>

              {/* Before Image */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Raw / Before Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... image URL"
                    value={workBeforeImage}
                    onChange={(e) => setWorkBeforeImage(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                  <input
                    type="file"
                    ref={beforeInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'before')}
                  />
                  <button
                    type="button"
                    onClick={() => beforeInputRef.current?.click()}
                    disabled={isUploadingBefore}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer"
                  >
                    {isUploadingBefore ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                    Upload
                  </button>
                </div>
              </div>

              {/* After Image */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Edited / After Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... image URL"
                    value={workAfterImage}
                    onChange={(e) => setWorkAfterImage(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                  <input
                    type="file"
                    ref={afterInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'after')}
                  />
                  <button
                    type="button"
                    onClick={() => afterInputRef.current?.click()}
                    disabled={isUploadingAfter}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer"
                  >
                    {isUploadingAfter ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                    Upload
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={globalLoading}
                  className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {globalLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {editingWork ? 'Update Work Item' : 'Publish to Portfolio'}
                </button>
                {editingWork && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingWork(null);
                      setWorkLabel('');
                      setWorkBeforeImage('');
                      setWorkAfterImage('');
                    }}
                    className="px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Published Works ({works.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {works.map((w) => (
                <div key={w.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden relative border border-slate-200/60 dark:border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.afterImage || w.thumbnail} alt={w.label} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[9px] font-black text-white uppercase tracking-wider">
                      {w.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ID #{w.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingWork(w);
                          setWorkLabel(w.label);
                          setWorkBeforeImage(w.beforeImage);
                          setWorkAfterImage(w.afterImage);
                          setWorkThumbnail(w.thumbnail);
                        }}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                        title="Edit Work"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteWork(w.id)}
                        className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 cursor-pointer"
                        title="Delete Work"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Clients */}
      {activeTab === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Client Form */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
            <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              {editingClient ? 'Edit Creator' : 'Add New Creator'}
            </h2>

            <form onSubmit={handleSaveClient} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Creator / Channel Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tech Burner, Ankur Warikoo"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subscriber Count</label>
                <input
                  type="text"
                  placeholder="e.g. 11.2M Subscribers"
                  value={clientSubscribers}
                  onChange={(e) => setClientSubscribers(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Avatar / Channel Logo</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... avatar URL"
                    value={clientImage}
                    onChange={(e) => setClientImage(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                  <input
                    type="file"
                    ref={clientInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'client')}
                  />
                  <button
                    type="button"
                    onClick={() => clientInputRef.current?.click()}
                    disabled={isUploadingClientImg}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer"
                  >
                    {isUploadingClientImg ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                    Upload
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={globalLoading}
                  className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {globalLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {editingClient ? 'Update Creator' : 'Add Creator to Website'}
                </button>
                {editingClient && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingClient(null);
                      setClientName('');
                      setClientImage('');
                      setClientSubscribers('');
                    }}
                    className="px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Client List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Creators Showcase ({clients.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clients.map((c) => (
                <div key={c.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{c.name}</h4>
                      <p className="text-xs font-bold text-slate-400 truncate">{c.subscribers || 'Creator Partner'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingClient(c);
                        setClientName(c.name);
                        setClientImage(c.image);
                        setClientSubscribers(c.subscribers || '');
                      }}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(c.id)}
                      className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Instagram Live Showcase */}
      {activeTab === 'instagram' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
            <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Instagram size={18} className="text-indigo-600" />
              Instagram Showcase Details
            </h2>

            <form onSubmit={handleSaveInstagram} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Posts Count</label>
                  <input
                    type="text"
                    value={instaPosts}
                    onChange={(e) => setInstaPosts(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Followers</label>
                  <input
                    type="text"
                    value={instaFollowers}
                    onChange={(e) => setInstaFollowers(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Following</label>
                  <input
                    type="text"
                    value={instaFollowing}
                    onChange={(e) => setInstaFollowing(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={instaFullName}
                    onChange={(e) => setInstaFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
                  <input
                    type="text"
                    value={instaCategory}
                    onChange={(e) => setInstaCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Admin Mention Text</label>
                <input
                  type="text"
                  value={instaAdminText}
                  onChange={(e) => setInstaAdminText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Admin Profile Link</label>
                <input
                  type="text"
                  value={instaAdminLink}
                  onChange={(e) => setInstaAdminLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Bio Lines</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={instaBioLine1}
                    onChange={(e) => setInstaBioLine1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                  <input
                    type="text"
                    value={instaBioLine2}
                    onChange={(e) => setInstaBioLine2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                  <input
                    type="text"
                    value={instaBioLine3}
                    onChange={(e) => setInstaBioLine3(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={globalLoading}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {globalLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                Save Instagram Configuration
              </button>
            </form>
          </div>

          {/* Phone Preview */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Live Preview</h3>
            <div className="scale-90 origin-top">
              <InstagramMockup 
                config={{
                  username: instaUsername,
                  profileImage: instaProfileImage,
                  posts: instaPosts,
                  followers: instaFollowers,
                  following: instaFollowing,
                  fullName: instaFullName,
                  category: instaCategory,
                  adminText: instaAdminText,
                  adminLink: instaAdminLink,
                  bioLine1: instaBioLine1,
                  bioLine2: instaBioLine2,
                  bioLine3: instaBioLine3,
                  websiteLabel: instaWebsiteLabel,
                  websiteUrl: instaWebsiteUrl
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
